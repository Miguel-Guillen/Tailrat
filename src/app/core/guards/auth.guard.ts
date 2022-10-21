import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router){}

  canActivate(){
    const credentials = localStorage.getItem('logged');
    if(credentials == null || !credentials){ 
      this.route.navigate(['/login']);
    }
    return true;
  }
  
}
