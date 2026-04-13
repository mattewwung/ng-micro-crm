import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.type';
import { of, delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private mockData: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Software Engineer',
      company: 'Tech Company',
      lastContactDate: '2026-04-13',
      tags: ['important', 'follow-up']
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Product Manager',
      company: 'Another Tech Company',
      lastContactDate: '2026-03-15',
      tags: ['potential', 'network']
    },
    {
      id: '3',
      name: 'Jane Smith',
      title: 'Product Manager',
      company: 'Another Tech Company',
      lastContactDate: '2024-05-15',
      tags: ['potential', 'network']
    },
    {
      id: '4',
      name: 'Peter Parker',
      title: 'Photographer',
      company: 'Daily Bugle',
      lastContactDate: '2024-01-10',
      tags: ['media', 'follow-up']
    },
  ];

  getContacts(): Observable<Contact[]> {
    return of(this.mockData).pipe(delay(500));
  }

  getContactById(id: string): Observable<Contact | undefined> {
    return of(this.mockData.find(contact => contact.id === id)).pipe(delay(500));
  }

  addContact(contact: Contact): Observable<void> {
    this.mockData.push(contact);

    return of(void 0).pipe(delay(500));
  }

  updateContact(updatedContact: Contact): Observable<void> {
    const index = this.mockData.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      this.mockData[index] = updatedContact;
    }

    return of(void 0).pipe(delay(500));
  }

  deleteContact(id: string): Observable<void> {
    this.mockData = this.mockData.filter(contact => contact.id !== id);

    return of(void 0).pipe(delay(500));
  }
}
