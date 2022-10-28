import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserAuth } from '../models/user-auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject(new UserAuth);
  private userLogged$ = this.user$.asObservable();

  constructor(private firestore: AngularFirestore, private angularAuth: AngularFireAuth,
    private storage: Storage) {
      this.storage.create();
    }

  searchUser(email: string): Observable<any>{
    return this.firestore.collection('usuarios', res => res
    .where('email', '==', email)).snapshotChanges();
  }

  isLogged(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('logged'));
    const userMovil = this.storage.get('logged') || [];
    // this.user$.next(user != null ? user : new UserAuth);
    this.user$.next(user != null ? user : userMovil != null ? user : null);
    return this.userLogged$;
  }

  async login(user: any){
    this.storage.set('logged', user);
    localStorage.setItem('logged', JSON.stringify(user));
    this.user$.next(user);
    return this.userLogged$;
  }

  loginWithEmailAndPass(email: string, password: string): Promise<any> {
    return this.angularAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
      return res.user;
    }).catch(err => {
      return err;
    });
  }

  loginWithGoogle(): Promise<any> {
    try {
      return this.angularAuth.signInWithPopup(new GoogleAuthProvider()).then((res) => {
        return res;
      });
    }catch(err: any){
      return err;
    }
  }
  
  logout(): Promise<any> {
    localStorage.removeItem('logged');
    this.storage.remove('logged');
    return this.angularAuth.signOut().then();
  }

  registerWithEmailAndPass(email: string, password: string, user: any): Promise<any> {
    try {
      return this.angularAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
        user.uid = res.user.uid;
        this.firestore.collection('usuarios').add(user);
      })
    }catch(error){
      return error
    }
  }
}
