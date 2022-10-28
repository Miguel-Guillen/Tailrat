import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private storage: Storage){
    this.storage.create();
  }

  canActivate(){
    const user = localStorage.getItem('logged');
    const userMovil = this.storage.get('logged');
    const credentials = user != null ? user : userMovil == null ? userMovil : null;

    if(credentials == null || !credentials){ 
      this.route.navigate(['/login']);
    }
    return true;
  }
  
}
