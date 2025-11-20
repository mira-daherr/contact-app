import { Injectable } from '@angular/core';
import { Contact } from './contact.model';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { randFullName, randEmail, randPhoneNumber , randStreetAddress} from '@ngneat/falso';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // private contacts: Contact[] = [];//array to save all the contacts

  // constructor() { 
  //   const saveContacts=localStorage.getItem('contacts');
  //   if(saveContacts){
  //     this.contacts=JSON.parse(saveContacts);
  //   }
  // }
  // private saveToLocalStorage() :void{
  //   localStorage.setItem('contacts',JSON.stringify(this.contacts));

  // }
  // getContacts(): Contact[] {
  //   return this.contacts;
  // }//get all the contacts.
  // addContact(contact: Contact): void {
  //   this.contacts.push(contact);
  //   this.saveToLocalStorage();
  // }//push:add the item at the end of array

  // deleteContact(id: number): void {
  //   this.contacts = this.contacts.filter(c => c.id !== id);
  //    this.saveToLocalStorage();
  // }//delete contact by id,filter(new array without the contact with the id deleted)
  //   updateContact(updatedContact: Contact): void {
  //   const index = this.contacts.findIndex(c => c.id === updatedContact.id);
  //   if (index > -1) this.contacts[index] = updatedContact;
  //    this.saveToLocalStorage();
  // }
  // searchContact(term: string): Contact[] {
  //   return this.contacts.filter(c => c.name.toLowerCase().includes(term.toLowerCase()) ||
  //     c.email.toLowerCase().includes(term.toLowerCase()) ||
  //     c.phone.includes(term));
  // }
  
  constructor(private firestore: AngularFirestore) {}

  getContacts(): Observable<Contact[]> {
    return this.firestore.collection<Contact>('contacts').valueChanges({ idField: 'id' });
  }

  addContact(contact: Contact): Promise<any> {
    return this.firestore.collection('contacts').add(contact);
  }

  updateContact(contact: Contact): Promise<void> {
    return this.firestore.doc(`contacts/${contact.id}`).update(contact);
  }

  deleteContact(id: string): Promise<void> {
    return this.firestore.doc(`contacts/${id}`).delete();
  }

  getContact(id: string): Observable<Contact | undefined> {
    return this.firestore.doc<Contact>(`contacts/${id}`).valueChanges();
  }
    generateRandomContact(): Contact {
    return {
      // id: '',
      name: randFullName(),
      email: randEmail(),
      phone: randPhoneNumber(),
       address: randStreetAddress(), 
    } as Contact;
  } async generateAndSaveContacts(count: number): Promise<void> {
    const contactsCollection = this.firestore.collection('contacts');
    for (let i = 0; i < count; i++) {
      const docRef=contactsCollection.doc();//firestore generate id
      const randomContact = this.generateRandomContact();
      const contactWithId={
        ...randomContact,
        id:docRef.ref.id,
      }
      await docRef.set(contactWithId);
      console.log(`Added: ${contactWithId.name}`);
      //await contactsCollection.add(randomContact);
      //console.log(`Added random contact: ${randomContact.name}`);
    }
  }
}