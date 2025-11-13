import { Component,Input,Output,EventEmitter } from '@angular/core';//eventemitter is the tool that make it send the events
import { Contact } from '../contact.model';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
@Input() contact!: Contact;
@Output() delete =new EventEmitter<string>();//output(this event the parent can handle it)delete(the name of the event)he will send a number.
@Output() edit =new EventEmitter<Contact>();
@Output() close =new EventEmitter<void>();




onDelete(){
  if (this.contact) this.delete.emit(this.contact.id);
}
onEdit(){
    if (this.contact) this.edit.emit(this.contact);
}
 onClose() {
    this.close.emit();
  }



}
