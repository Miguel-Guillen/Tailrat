import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../../core/models/user-auth';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user = new UserAuth;

  constructor(private route: Router, private auth: AuthService) {
    this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  ngOnInit() {
  }

  logout(){
    this.user = new UserAuth;
    this.auth.logout();
    this.route.navigate(['/login']);
  }
}
