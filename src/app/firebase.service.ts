import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private functions: AngularFireFunctions) {}

  helloWorld(): Observable<any> {
    const callable = this.functions.httpsCallable('helloWorld');
    return callable({});
  }

  createContact(contact: any): Observable<any> {
    const callable = this.functions.httpsCallable('createContact');
    return callable({ contact }); 
  }
}