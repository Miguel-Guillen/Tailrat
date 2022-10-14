import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from './core/models/user-auth';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user = new UserAuth;

  constructor(private route: Router, private auth: AuthService) {
    this.user = this.auth.isLogged();
  }

  logout(){
    this.user = new UserAuth;
    this.auth.isLogout();
    this.route.navigate(['/home']);
  }
}
