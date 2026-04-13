import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './core/guards/unsaved-changes-guard';

export const routes: Routes = [
  {
    path: '',
    title: '联系人 - Micro CRM',
    loadComponent: () => import('./features/contact-list/list/list').then(m => m.List)
  },
  {
    path: 'edit/:id',
    title: '编辑联系人 - Micro CRM',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./features/contact-edit/edit/edit').then(m => m.Edit),
  }
];
