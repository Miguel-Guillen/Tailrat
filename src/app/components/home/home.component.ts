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
  items: Object[] = [];
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
    this.getProducts()
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

}
