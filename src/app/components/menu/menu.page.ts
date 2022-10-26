import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuth } from '../../core/models/user-auth';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
  user = new UserAuth;
  subscription = new Subscription

  constructor(private route: Router, private auth: AuthService) {}

  ngOnInit() {
    this.authUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {      
      this.user = res;
    });
  }

  logout(){
    this.auth.logout().then(() => {
      this.route.navigate(['/login']);
    });
  }
}
