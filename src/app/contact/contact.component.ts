import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Observable, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AlgoliaService } from '../algolia.service';
import { FirebaseService } from '../firebase.service';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts$!: Observable<Contact[]>;
  contactsList: Contact[] = [];
  newContact: Contact = { id: '', name: '', email: '', phone: '', address: '' };
  searchTerm: string = "";
  selectedContact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    public authService: AuthService,
    private algoliaService: AlgoliaService,
    private firebaseService: FirebaseService
  ) { }
ngOnInit(): void {
  this.loadPdfFonts();
  this.loadContacts();

 
  this.firebaseService.helloWorld().subscribe({//welcome the response from firebase.
    next: (res: any) => {
      console.log(res.message); 
    },
    error: (err: any) => {
      console.error('Error calling helloWorld:', err);
    }
  });
}


  searchInAlgolia() {
    if (!this.searchTerm) {
      this.loadContacts();
      return;
    }

    this.algoliaService.searchContacts(this.searchTerm).then(results => {
      this.contactsList = results;
    });
  }




  async loadPdfFonts(): Promise<void> {
    const pdfFonts = await import('pdfmake/build/vfs_fonts');
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
  }

  loadContacts(): void {
    this.contacts$ = this.contactService.getContacts();
    this.contacts$.pipe(take(1)).subscribe(contacts => {
      this.contactsList = contacts;
      this.algoliaService.saveContacts(this.contactsList).then(() => {
        console.log('Contacts pushed to Algolia');
      });
    });
  }

  addContact(): void {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.contactService.addContact({ ...this.newContact }).then(() => {
        this.newContact = { id: '', name: '', email: '', phone: '', address: '' };
        this.loadContacts();
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
    this.contactService.generateAndSaveContacts(5);
  }

  logout() {
    this.authService.logout();
  }

  exportToPDF() {
    if (!this.contactsList || this.contactsList.length === 0) {
      alert("No contacts to export!");
      return;
    }

    const body = [['#', 'Name', 'Email', 'Phone', 'Address']];
    this.contactsList.forEach((c, i) => {
      body.push([
        String(i + 1),
        c.name || '',
        c.email || '',
        c.phone || '',
        c.address || ''
      ]);
    });

    const docDefinition: any = {
      content: [
        { text: 'Contact List', style: 'header' },
        { table: { headerRows: 1, widths: ['auto', '*', '*', '*', '*'], body: body } }
      ],
      styles: { header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] } }
    };

    (pdfMake as any).createPdf(docDefinition).download('contacts.pdf');
  }
}