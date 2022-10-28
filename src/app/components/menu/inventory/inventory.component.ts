import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { ProductService } from 'src/app/core/service/product.service';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  user = new UserAuth;
  subscription = new Subscription;
  infoSubs = new Subscription
  formInventory: FormGroup;
  products: any[] = [];
  preview: any
  image: any;

  isModalOpen = false;
  isSelected= false;
  formValid = true;
  loading = false;

  id = '';
  proveedors = [
    'Seleccionar',
    'Lala',
    'San marcos',
    'La costeña',
    'La granja'
  ]
  
  constructor(private auth: AuthService, private _productService: ProductService,
    private formB: FormBuilder, private alertController: AlertController,
    private camera: Camera, private plt: Platform) {
      this.formInventory = this.createForm();
    }

  ngOnInit() {
    this.authUser();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  createForm(): FormGroup {
    return this.formInventory = this.formB.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      precio: [0, Validators.min(3)],
      cantidad: [1],
      piezas: [1],
      img: [''],
      id_proveedor: [this.proveedors[0]]
    })
  }
  
  authUser(){
    this.subscription = this.auth.isLogged().subscribe((res: any) => {
      this.user = res;
    });
  }

  getProducts(){
    const subs1 = this._productService.getProductsById(this.user.uid).subscribe((res: any) => {
      this.products = [];
      if(res.length > 0){
        res.forEach((product: any) => {
          this.products.push({
            id: product.payload.doc.id,
            ... product.payload.doc.data()
          })
        });
        this.infoSubs.add(subs1);
      }
    })
  }

  addProduct(data: any){
    this.formValid = true;
    this.loading = true;
    if(this.formInventory.valid === true){
      const proveedor = data.id_proveedor != 'Seleccionar' ? data.id_proveedor : ''
      const product = {
        uid: this.user.uid,
        id_proveedor: proveedor,
        ... data
      };

      if(this.isSelected === false){
        if(this.preview){
          this._productService.uploadImage(this.image, product).subscribe((res: any) => {
            if(res == 100){
              this.loading = false
              this.reset();
              this.isModalOpen = false;
            }
          })
        }else {
          this._productService.addProduct(product).then(() => {
            this.loading = false
            this.reset();
            this.isModalOpen = false;
          })
        }
      }else {
        this._productService.updateProduct(this.id, product).then(() => {
          this.loading = false
          this.reset();
          this.isModalOpen = false;
        })
      }
    }else {
      this.errorAlert();
      this.formValid = false;
    }
  }

  modalUD(product: any){
    this.isSelected = true;
    this.id = product.id;
    this.formInventory.setValue({
      titulo: product.titulo,
      descripcion: product.descripcion,
      precio: product.precio,
      cantidad: product.cantidad,
      piezas: product.piezas,
      img: '',
      id_proveedor: product.id_proveedor
    })
    this.isModalOpen = true;
  }

  deleteProduct(){
    
  }

  async takePhoto(){
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    await this.camera.getPicture(options).then((imageData) => {
      if(imageData){
        this.image = imageData;
        this.preview = this.imgBase64(this.image);
      }
      // this.preview = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      console.log(err);
     });
  }

  // upload image
  appendArchive(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.image = event.target.files[0];
      }
      this.imgBase64(this.image).then((imagen: any) =>{
        this.preview = imagen.base;
      });
    }
  }

  // convert base64
  imgBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({ base: reader.result });
      };
      reader.onerror = (error) => {
        reject({ base: error });
      };
      return reader.DONE;
    }catch(e) {
      return null;
    }
  })

  // async readAsBase64(photo: any) {
  //   const response = await fetch(photo.webPath);
  //   const blob = await response.blob();
  //   return await this.convertBlobToBase64(blob) as string;
  // }

  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader;
  //   reader.onerror = reject;
  //   reader.onload = () => {
  //       resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // });

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Datos incorrectos o faltantes',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  get title(){
    return this.formInventory.get('titulo');
  }
  get cost(){
    return this.formInventory.get('precio');
  }

  reset(){
    this.formInventory.reset();
    this.formValid = true;
    this.id = '';
    this.image = null;
    this.preview = null
  }
}
