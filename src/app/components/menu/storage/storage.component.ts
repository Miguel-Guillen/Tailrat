import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/core/service/storage.service';
import { ProductService } from 'src/app/core/service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import SwiperCore, { Autoplay, Swiper } from "swiper";
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  user = new UserAuth;
  subscription = new Subscription;
  infoSubs = new Subscription;
  forms: FormGroup

  listProducts: any[] = [];
  products: any[] = [];

  isModalOpen = false;
  formValid = true;
  loading = false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  proveedors = [
    {
      nombre: 'Lala',
      empresa: 'Grupo Lala, S.A.B. de C.V.'
    },
    {
      nombre: 'San Marcos',
      empresa: 'Interpec San Marcos S.A.'
    },
    {
      nombre: 'La Granja',
      empresa: 'Alimentos de la Granja S.A.'
    }
  ]

  advertising = [
    'https://www.caliente.mx/library/assets/casino/promotions/thumbnails/300-bonus.jpg',
    'https://www.marketeroslatam.com/wp-content/uploads/2022/06/coca-cola-840x400.jpg',
    'https://s3.amazonaws.com/lmxwebsite/media/news/38642/size2/38642.jpg',
    'https://www.comunicarseweb.com/sites/default/files/styles/galeria_noticias/public/biblioteca/images//1437506486_Fanta-Fanta-Taste-Grafica-1.jpg?itok=BQrq6hlk',
  ];
  random = 0
  
  constructor(
    private auth: AuthService, 
    private _serviceStorage: StorageService,
    private _serviceProducts: ProductService, 
    private formB: FormBuilder,
    private alertController: AlertController, 
    private router: Router,
    private sheet: ActionSheetController,
    ) {
    this.forms = this.createForm();
  }

  ngOnInit() {
    this.authUser();
    this.getStorage();
    this.random = Math.floor(Math.random() * this.advertising.length);;
  }

  createForm(): FormGroup {
    return this.forms = this.formB.group({
      cantidad_tienda: [0, Validators.min(1)],
      cantidad_bodega: [0, Validators.min(1)],
      id_producto: ['Seleccionar', Validators.required],
      sucursal: ['principal'],
      proveedor: [this.proveedors[0]]
    })
  }

  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  searchProduct(id: string){
    this.router.navigate(['dashboard/register/' + id]);
  }

  getStorage(){
    const subs1 = this._serviceStorage.getStorage(this.user.uid).subscribe((res: any) => {
      this.listProducts = [];

      if(res.length > 0){
        res.forEach(element => {
          this.listProducts.push({
            id: element.payload.doc.id,
            ... element.payload.doc.data()
          })
        });        
      }      
    });
    
    const subs2 = this._serviceProducts.getProductsByUid(this.user.uid).subscribe((response: any) => {
      response.forEach(item => {
        this.products.push({
          id: item.payload.doc.id,
          name: item.payload.doc.data()['titulo']
        })
      });
    })

    this.infoSubs.add(subs1);
    this.infoSubs.add(subs2);
  }

  newStorage(data: any){
    this.formValid = true;
    if(this.forms.valid === true){
      this.loading = true;
      const inventory = {
        producto: this.products.find(product => product.id === data.id_producto).name,
        uid: this.user.uid,
        ... data
      }

      this._serviceStorage.addRegister(inventory).then(() => {
        this.loading = false
        this.reset();
        this.isModalOpen = false;
      })
    }else {
      this.formValid = false;
      this.errorAlert()
    }
  }

  changeSlide(slide: number){
    this.slides.slideTo(slide, 400);
  }

  async actionSheet() {
    const actionSheet = await this.sheet.create({
      header: 'Registro de inventario',
      cssClass: 'sheet-colors',
      buttons: [
        {
          text: 'Crear nuevo registro de inventario',
          role: 'destructive',
          data: { action: 'delete' },
          handler: () => this.isModalOpen = true
        },
        {
          text: 'Registrar por metodo de barras',
          data: { action: 'share' }
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

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Datos incorrectos o faltantes',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  send(path: string){
    this.router.navigate(['/dashboard/' + path]);
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

  reset(){
    this.forms = this.createForm();
    this.formValid = true;
    this.changeSlide(0);
  }
}
