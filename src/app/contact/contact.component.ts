import { Component,OnInit} from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contacts :Contact[]=[];
  newContact : Contact ={id: 0, name: '', email: '', phone: ''};
  searchTerm:string="";
  selectedContact: Contact | null = null;// editingContact: Contact | null = null;

  constructor (private contactService:ContactService){}

  ngOnInit(): void {
    this.loadContacts();
  }
  loadContacts():void{
    this.contacts=this.contactService.getContacts();
  }

  addContact():void{
    if(this.newContact.name && this.newContact.email && this.newContact.phone){
      this.newContact.id=this.contacts.length+1;
      this.contactService.addContact({...this.newContact});
      this.newContact={id: 0, name: '', email: '', phone: ''};
      this.loadContacts();

    }
  }
  deleteContact(id:number):void{
    this.contactService.deleteContact(id);
    this.loadContacts();
  }
  // searchContact():void{
  //   if(this.searchTerm){
  //     this.contacts=this.contactService.searchContact(this.searchTerm);
  //   }
  // }
  updateContact(updated: Contact): void {
  this.contactService.updateContact(updated);
  this.loadContacts();
}


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
