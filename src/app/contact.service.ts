import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];//array to save all the contacts

  constructor() { }
  getContacts(): Contact[] {
    return this.contacts;
  }//get all the contacts.
  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }//push:add the item at the end of array

  deleteContact(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }//delete contact by id,filter(new array without the contact with the id deleted)
    updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index > -1) this.contacts[index] = updatedContact;
  }
  searchContact(term: string): Contact[] {
    return this.contacts.filter(c => c.name.toLowerCase().includes(term.toLowerCase()) ||
      c.email.toLowerCase().includes(term.toLowerCase()) ||
      c.phone.includes(term));
  }
}
