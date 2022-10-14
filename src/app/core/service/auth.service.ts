import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserAuth } from '../models/user-auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new UserAuth;

  constructor(private angularAuth: AngularFireAuth) { }

  isLogged(): UserAuth {
    const user = JSON.parse(localStorage.getItem('logged'));
    const firebaseUser = this.angularAuth.authState.pipe(first()).toPromise();
    if(firebaseUser) return this.user = user == null ? new UserAuth : user;
    else { this.logout() };
  }

  loginWithGoogle(): Promise<any> {
    try {
      return this.angularAuth.signInWithPopup(new GoogleAuthProvider()).then((res) =>{
        return res
      });
    }catch(err: any){
      return err;
    }
  }
  
  logout(): Promise<any>{
    console.log("cerrando sesion");
    localStorage.removeItem('logged');
    this.user = new UserAuth;
    return this.angularAuth.signOut().then();
  }
}
