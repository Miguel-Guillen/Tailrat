import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuth } from '../models/user-auth';

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
