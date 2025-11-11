import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {
  transform(contacts: Contact[], searchTerm: string): Contact[] {
    if(!contacts) return [];
    if(!searchTerm) return contacts;

    searchTerm = searchTerm.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm)
    );
  }
}
