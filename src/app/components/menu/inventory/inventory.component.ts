import { Component, OnInit } from '@angular/core';
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
  products: any[] = []
  isModalOpen = false;
  
  constructor(private auth: AuthService, private _productService: ProductService) { }

  ngOnInit() {
    this.authUser();
    this.getProducts();
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

}
