import { Injectable } from '@angular/core';
import { UserAuth } from '../models/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new UserAuth;

  constructor() { }

  isLogged(): UserAuth {
    const user = JSON.parse(localStorage.getItem('logged'));
    return this.user = user == null ? new UserAuth : user;
  }

  isLogout(){
    localStorage.removeItem('logged');
    this.user = new UserAuth;
  }
}
