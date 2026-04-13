import { Component, input, output } from '@angular/core';
import { Contact } from '../../../core/models/contact.type';
import { StaleAlert } from '../../directives/stale-alert';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-card',
  imports: [StaleAlert, TimeAgoPipe, CommonModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.css',
})
export class ContactCard {
  // 等价旧的写法：@Input() data!: Contact;
  data = input.required<Contact>();
  // 等价旧的写法：@Output() onEdit = new EventEmitter<string>();
  onEdit = output<string>();
}
