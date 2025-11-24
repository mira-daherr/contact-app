import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private functions: AngularFireFunctions) {}//object make me use with the firebase functions from angular

  helloWorld() {
    const callable = this.functions.httpsCallable('helloWorld');
    return callable({}); 
  }
}
///////this is the relation between firebase and angular.