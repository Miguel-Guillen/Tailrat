import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getProductsById(uid: string): Observable<any> {
    return this.firestore.collection('productos', ref => ref
    .where('uid', '==', uid)).snapshotChanges();
  }

  addProduct(product: any): Promise<any> {
    return this.firestore.collection('productos').add(product);
  }

  updateProduct(id: string, product: any): Promise<any> {
    return this.firestore.collection('productos').doc(id).update(product);
  }

  uploadImage(file: any, product: any): Observable<any> {
    if(file || file != undefined){
      const date = new Date().getTime();
      const path = `IMAGENES-PRODUCTOS/${date}_${product.titulo}`;
      const storageRef = this.storage.ref(path);
      const upload = this.storage.upload(path, file);
  
      upload.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            product.img = downloadURL;
            this.addProduct(product);
          });
        })
      ).subscribe();
      return upload.percentageChanges();
    }else {
      product.img = '';
      this.addProduct(product);
    }
  }

}
