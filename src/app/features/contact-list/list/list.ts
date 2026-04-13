import { Component, computed, signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContactCard } from '../../../shared/ui/contact-card/contact-card';
import { ContactService } from '../../../core/services/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [ContactCard],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  private router = inject(Router);
  private contactService = inject(ContactService);

  contacts = toSignal(this.contactService.getContacts(), { initialValue: [] });
  searchQuery = signal<string>('');

  filteredContacts = computed(() => {
    const query = this.searchQuery().toLocaleLowerCase();

    return this.contacts().filter(contact => contact.name.toLocaleLowerCase().includes(query));
  })

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  handleEdit(id: string) {
    this.router.navigate(['/edit', id]);
  }
}
