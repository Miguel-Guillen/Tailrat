import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  getProductsById(uid: string): Observable<any> {
    return this.firestore.collection('productos', ref => ref
    .where('uid', '==', uid)).snapshotChanges();
  }

  addProduct(product: any): Promise<any> {
    return this.firestore.collection('productos').add(product);
  }
}
