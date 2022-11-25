import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';
import SwiperCore, { Autoplay, Swiper } from "swiper";
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  user = new UserAuth;
  subscription = new Subscription;
  infoUser: any = {}

  advertising = [
    'https://www.caliente.mx/library/assets/casino/promotions/thumbnails/300-bonus.jpg',
    'https://www.marketeroslatam.com/wp-content/uploads/2022/06/coca-cola-840x400.jpg',
    'https://s3.amazonaws.com/lmxwebsite/media/news/38642/size2/38642.jpg',
    'https://www.comunicarseweb.com/sites/default/files/styles/galeria_noticias/public/biblioteca/images//1437506486_Fanta-Fanta-Taste-Grafica-1.jpg?itok=BQrq6hlk',
  ];
  random = 0

  constructor(private _service: UserService, private _authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authUser();
    this.getPerfil();
    this.random = Math.floor(Math.random() * this.advertising.length);;
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

  send(path: string){
    this.router.navigate(['/dashboard/' + path]);
  }
}
