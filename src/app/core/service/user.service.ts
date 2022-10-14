import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  get(): Observable<any>{
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  getByUID(id: string): Observable<any>{
    return this.firestore.collection('usuarios', res => res
    .where('uid', '==', id)).snapshotChanges();
  }
}
