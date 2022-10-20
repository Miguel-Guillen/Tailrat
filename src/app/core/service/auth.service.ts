import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserAuth } from '../models/user-auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new UserAuth;
  private user$ = new Observable;

  constructor(private angularAuth: AngularFireAuth) { }

  isLogged(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('logged'));
    this.user$ = new Observable((observer) => {
      observer.next(user == null ? new UserAuth : user);
      observer.complete();
    })
    return this.user$;
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

  login(user: any){
    this.user$ = new Observable((observer) => {
      observer.next(user == null ? new UserAuth : user);
    })
  }
  
  logout(){
    console.log("cerrando sesion");
    localStorage.removeItem('logged');
    this.angularAuth.signOut().then();
  }
}
