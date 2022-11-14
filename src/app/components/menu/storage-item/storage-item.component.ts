import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/service/product.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { Product, ProductInventory } from 'src/app/core/models/product';

@Component({
  selector: 'app-storage-item',
  templateUrl: './storage-item.component.html',
  styleUrls: ['./storage-item.component.scss'],
})
export class StorageItemComponent implements OnInit {
  forms: FormGroup
  id: string;

  user = new UserAuth;
  subscription = new Subscription;
  infoSubs = new Subscription;
  product = new ProductInventory
  listProducts: Product[] | any = [];

  isModalOpen = false;
  formValid = true;
  loading = false;

  proveedors = [
    'Seleccionar',
    'Lala',
    'San marcos',
    'La costeña',
    'La granja'
  ]

  constructor(
    private auth: AuthService, 
    private route: ActivatedRoute,
    private _serviceProduct: ProductService, 
    private _serviceStorage: StorageService,
    private sheet: ActionSheetController,
    private alertController: AlertController,
    private formB: FormBuilder
    ) {}

  ngOnInit() {
    this.authUser();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  createForm(){
    return this.formB.group({
      id_producto: [this.product.id_producto, Validators.required],
      cantidad_tienda: [this.product.bodega, Validators.min(1)],
      cantidad_bodega: [this.product.tienda, Validators.min(1)],
      proveedor: [this.product.proveedor]
    })
  }

  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  getData(){
    const subs1 = this._serviceProduct.getProductById(this.id).subscribe((res: any) => {
      let infoProduct = {
        id: res.payload.id,
        ... res.payload.data()
      }

      const subs2 = this._serviceStorage.getByProduct(this.id).subscribe((response: any) => {
        this.product = {
          id: response[0].payload.doc.id,
          id_producto: infoProduct.id,
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
      
      this.infoSubs.add(subs1);
      this.infoSubs.add(subs2)
    })
  }

  getProducts(){
    const subs = this._serviceProduct.getProductsByUid(this.user.uid).subscribe((response: any) => {
      this.listProducts = [];
      response.forEach(item => {
        this.listProducts.push({
          id: item.payload.doc.id,
          name: item.payload.doc.data()['titulo']
        })
      });
    })
    
    this.infoSubs.add(subs);
  }

  updateRegister(data: any){
    this.formValid = true;
    if(this.forms.valid === true){
      this.loading = true;
      const inventory = {
        producto: this.listProducts.find(product => product.id === data.id_producto).name,
        ... data
      }

      this._serviceStorage.updateRegister(this.product.id, inventory).then(() => {
        this.reset();
      })
    }else {
      this.formValid = false;
      this.errorAlert()
    }
  }

  async actionSheet() {
    const actionSheet = await this.sheet.create({
      header: 'Nuevo registro de inventario',
      cssClass: 'sheet-colors',
      buttons: [
        {
          text: 'Cambiar manualmente (formulario)',
          role: 'destructive',
          data: { action: 'delete' },
          handler: () => {
            this.getProducts();
            this.forms = this.createForm();
            this.isModalOpen = true;
          }
        },
        {
          text: 'Registrar por metodo de barras',
          data: { action: 'share' },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: { action: 'cancel' },
        },
      ],
    });

    await actionSheet.present();
  }

  get prod(){
    return this.forms.get('id_producto');
  }

  get can_tienda(){
    return this.forms.get('cantidad_tienda');
  }

  get can_bodega(){
    return this.forms.get('cantidad_bodega');
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Datos incorrectos o faltantes',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  reset(){
    this.isModalOpen = false;
    this.formValid = true;
    this.loading = false;
  }
}
