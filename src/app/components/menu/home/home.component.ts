import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { SwiperComponent } from 'swiper/angular';

import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('swiperSlide') !swp: SwiperComponent
  user = new UserAuth;
  items: Object[] = [];
  subscription = new Subscription;
  advertising = [
    'https://www.caliente.mx/library/assets/casino/promotions/thumbnails/300-bonus.jpg',
    'https://www.marketeroslatam.com/wp-content/uploads/2022/06/coca-cola-840x400.jpg',
    'https://s3.amazonaws.com/lmxwebsite/media/news/38642/size2/38642.jpg',
    'https://www.comunicarseweb.com/sites/default/files/styles/galeria_noticias/public/biblioteca/images//1437506486_Fanta-Fanta-Taste-Grafica-1.jpg?itok=BQrq6hlk',
  ];
  random = 0
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.authUser();
    this.getProducts();
    this.random = Math.floor(Math.random() * this.advertising.length);;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  getProducts(){
    this.items = [
      {
        title: 'Yogurt Lala Fresa',
        descripcion: 'Yogurt sabor de fresa, 300ml',
        precio: 12,
        cantidad: 21,
        tipo: 'pieza',
        piezas: 1,
        ubicacion: 'Estante'
      },
      {
        title: 'Yogurt Lala Vainilla',
        descripcion: 'Yogurt sabor de vainilla, 300ml',
        precio: 12,
        cantidad: 28,
        tipo: 'pieza',
        piezas: 1,
        ubicacion: 'Estante'
      },
      {
        title: 'Yogurt San Marcos',
        descripcion: 'Yogurt sabor fresa, 350ml',
        precio: 15,
        cantidad: 17,
        tipo: 'pieza',
        piezas: 1,
        ubicacion: 'Estante'
      },
      {
        title: 'Yogurt San Marcos',
        descripcion: 'Yogurt sabor fresa, 350ml',
        precio: 15,
        cantidad: 4,
        tipo: 'caja',
        piezas: 18,
        ubicacion: 'Estante'
      },
    ]
  }

  send(path: string){
    this.router.navigate(['/dashboard/' + path]);
  }
}
