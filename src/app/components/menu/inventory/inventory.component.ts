import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/core/models/user-auth';
import { AuthService } from 'src/app/core/service/auth.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  user = new UserAuth;
  subscription = new Subscription;
  formInventory: FormGroup;
  products: any[] = []

  isModalOpen = false;
  proveedors = [
    'Seleccionar',
    'Lala',
    'San marcos',
    'La costeña',
    'La granja'
  ]
  
  constructor(private auth: AuthService, private _productService: ProductService,
    private formB: FormBuilder) {
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
      precio: [0, Validators.required],
      cantidad: [0],
      piezas: [0],
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
    this._productService.getProductsById(this.user.uid).subscribe((res: any) => {
      this.products = [];
      if(res.length > 0){
        res.forEach((product: any) => {
          this.products.push({
            id: product.payload.doc.id,
            ... product.payload.doc.data()
          })
        });
      }
    })
  }

  addProduct(data: FormData){

  }
}
