import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  user = new UserAuth;
  subscription = new Subscription;
  infoUser: any = {}

  constructor(private _service: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this.authUser();
    this.getPerfil();
  }

  authUser(){
    this.subscription = this._authService.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  getPerfil(){
    this._service.getByUID(this.user.uid).subscribe((res: any) => {
      if(res.length > 0){
        this.infoUser = {
          id: res[0].payload.doc.id,
          ... res[0].payload.doc.data()
        }
      }
    })
  }
}
