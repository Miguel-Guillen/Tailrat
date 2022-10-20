import { Component, OnInit } from '@angular/core';
import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: UserAuth;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

}
