import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactService } from '../../../core/services/contact';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Contact } from '../../../core/models/contact.type';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

type ContactFormModel = Pick<Contact, 'name' | 'title' | 'company' | 'tags'>;

@Component({
  selector: 'app-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  private router = inject(Router);
  private contactService = inject(ContactService);

  id = input<string>('');
  isNew = computed(() => !this.id());
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  isDirty = signal<boolean>(false);
  formModel = signal<ContactFormModel>(this.createEmptyFormModel());
  newTagInput = '';

  contact = toSignal(
    toObservable(this.id).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(id => (id ? this.contactService.getContactById(id) : of(null))),
      map(contact => contact ?? null),
      tap(contact => {
        this.formModel.set(contact ? this.toFormModel(contact) : this.createEmptyFormModel());
        this.isDirty.set(false);
        this.isLoading.set(false);
      })
    ),
    { initialValue: null as Contact | null }
  );

  markDirty() {
    this.isDirty.set(true);
  }

  addTag(event?: Event) {
    event?.preventDefault();
    const nextTag = this.newTagInput.trim();

    if (!nextTag) {
      return;
    }

    const hasTag = this.formModel().tags.includes(nextTag);
    if (!hasTag) {
      this.formModel.update(model => ({ ...model, tags: [...model.tags, nextTag] }));
      this.markDirty();
    }

    this.newTagInput = '';
  }

  removeTag(tag: string) {
    this.formModel.update(model => ({
      ...model,
      tags: model.tags.filter(existingTag => existingTag !== tag),
    }));
    this.markDirty();
  }

  save() {
    const model = this.formModel();
    const name = model.name.trim();
    if (!name) {
      return;
    }

    this.isSaving.set(true);

    const payload: Contact = {
      id: this.id() || crypto.randomUUID(),
      name,
      title: model.title.trim(),
      company: model.company.trim(),
      lastContactDate: new Date().toISOString().slice(0, 10),
      tags: [...model.tags],
    };

    const request$ = this.isNew()
      ? this.contactService.addContact(payload)
      : this.contactService.updateContact(payload);

    request$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isDirty.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSaving.set(false);
      },
    });
  }

  private createEmptyFormModel(): ContactFormModel {
    return {
      name: '',
      title: '',
      company: '',
      tags: [],
    };
  }

  private toFormModel(contact: Contact): ContactFormModel {
    return {
      name: contact.name,
      title: contact.title,
      company: contact.company,
      tags: [...contact.tags],
    };
  }
}
