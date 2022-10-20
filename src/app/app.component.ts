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
  // user = new UserAuth;

  constructor() {
    // this.auth.isLogged().subscribe((res: any) => {
    //   this.user = res;
    // });
  }

  // logout(){
  //   this.user = new UserAuth;
  //   this.auth.logout();
  //   this.route.navigate(['/login']);
  // }
}
