import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ContactCard } from './contact-card';
import { Contact } from '../../../core/models/contact.type';

describe('ContactCard', () => {
  let component: ContactCard;
  let fixture: ComponentFixture<ContactCard>;
  let nativeElement: HTMLElement;

  const buildContact = (overrides: Partial<Contact> = {}): Contact => ({
    id: '1',
    name: 'John Doe',
    title: 'Engineer',
    company: 'ACME',
    lastContactDate: '2026-04-01',
    tags: ['important', 'follow-up'],
    ...overrides,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactCard);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.componentRef.setInput('data', buildContact());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact information and tags', () => {
    const cardText  = nativeElement.textContent ?? '';

    expect(cardText).toContain('John Doe');
    expect(cardText).toContain('Engineer @ ACME');
    expect(cardText).toContain('important');
    expect(cardText).toContain('follow-up');
    expect(cardText).toContain('上次联系:');
  });

  it('should emit onEdit when click edit button', () => {
    const emitSpy = vi.spyOn(component.onEdit, 'emit');
    const button = nativeElement.querySelector('button');

    button?.click();

    expect(emitSpy).toHaveBeenCalledWith('1');
  });

  it('should add stale classes when last contact is older than 30 days', () => {
    fixture.componentRef.setInput(
      'data',
      buildContact({ lastContactDate: '2023-01-01' })
    );
    fixture.detectChanges();

    const host = nativeElement.querySelector('div');

    expect(host?.classList.contains('ring-2')).toBe(true);
    expect(host?.classList.contains('ring-red-400')).toBe(true);
    expect(host?.classList.contains('bg-red-50')).toBe(true);
  });
});
