import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/service/product.service';
import { StorageService } from 'src/app/core/service/storage.service';

import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-storage-item',
  templateUrl: './storage-item.component.html',
  styleUrls: ['./storage-item.component.scss'],
})
export class StorageItemComponent implements OnInit {
  user = new UserAuth;
  subscription = new Subscription;
  infoSubs = new Subscription;

  product = new Object
  id: string;

  constructor(private auth: AuthService, private route: ActivatedRoute,
    private _serviceProduct: ProductService, private _serviceStorage: StorageService) { }

  ngOnInit() {
    this.authUser();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  getData(){
    this._serviceProduct.getProductById(this.id).subscribe((res: any) => {
      let infoProduct = {
        id: res.payload.id,
        ... res.payload.data()
      }

      this._serviceStorage.getByProduct(this.id).subscribe((response: any) => {
        this.product = {
          id: infoProduct.id,
          nombre: infoProduct.titulo,
          descripcion: infoProduct.descripcion,
          img: infoProduct.img,
          precio: infoProduct.precio,
          piezas: infoProduct.piezas,
          bodega: response[0].payload.doc.data()['cantidad_bodega'],
          tienda: response[0].payload.doc.data()['cantidad_tienda'],
          sucursal: response[0].payload.doc.data()['sucursal'],
          id_proveedor: infoProduct.id_proveedor,
          proveedor: response[0].payload.doc.data()['proveedor'],
          uid: infoProduct.uid
        }
      })
    })
  }
}
