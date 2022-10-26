import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [
    MenuPage,
    HomeComponent,
    InventoryComponent
  ]
})
export class MenuPageModule {}
