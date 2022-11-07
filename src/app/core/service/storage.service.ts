import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) {}

  getStorage(uid: string): Observable<any> {
    return this.firestore.collection('almacen', ref => ref
    .where('uid', '==', uid).where('sucursal', '==', 'principal')).snapshotChanges();
  }

  getByProduct(id: string): Observable<any> {
    return this.firestore.collection('almacen', ref => ref
    .where('id_producto', '==', id)).snapshotChanges();
  }

  addRegister(inventory: any): Promise<any> {
    return this.firestore.collection('almacen').add(inventory);
  }
}
