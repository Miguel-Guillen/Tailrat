import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';
import { SwiperModule } from 'swiper/angular';

import { MenuPage } from './menu.page';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StorageComponent } from './storage/storage.component';
import { StorageItemComponent } from './storage-item/storage-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SwiperModule
  ],
  declarations: [
    MenuPage,
    HomeComponent,
    InventoryComponent,
    StorageComponent,
    StorageItemComponent
  ]
})
export class MenuPageModule {}
