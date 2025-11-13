import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts$!: Observable<Contact[]>;  // contacts :Contact[]=[];
  newContact: Contact = { id: '', name: '', email: '', phone: '' };
  searchTerm: string = "";
  selectedContact: Contact | null = null; // editingContact: Contact | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    // Observable from Firestore
    this.contacts$ = this.contactService.getContacts();
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      // Firestore auto-generates ID
      this.contactService.addContact({ ...this.newContact }).then(() => {
        this.newContact = { id: '', name: '', email: '', phone: '' };
      });
    }
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id);
  }

  updateContact(updated: Contact): void {
    if (updated.id) {
      this.contactService.updateContact(updated);
    }
  }
  addRandomContacts() {
  this.contactService.generateAndSaveContacts(5); // ← يولّد 5 contacts عشوائية
}


  // addContact():void{
  //   if(this.newContact.name && this.newContact.email && this.newContact.phone){
  //     this.newContact.id=this.contacts.length+1;
  //     this.contactService.addContact({...this.newContact});
  //     this.newContact={id: 0, name: '', email: '', phone: ''};
  //     this.loadContacts();
  //   }
  // }

  // deleteContact(id:number):void{
  //   this.contactService.deleteContact(id);
  //   this.loadContacts();
  // }

  // searchContact():void{
  //   if(this.searchTerm){
  //     this.contacts=this.contactService.searchContact(this.searchTerm);
  //   }
  // }

  // saveEdit() {
  //   if (this.editingContact) {
  //     this.contactService.updateContact(this.editingContact);
  //     this.editingContact = null;
  //     this.loadContacts();
  //   }
  // }

  // cancelEdit() {
  //   this.editingContact = null;
  // }
}
