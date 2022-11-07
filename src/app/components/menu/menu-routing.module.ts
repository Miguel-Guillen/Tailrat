import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsuarioComponent } from '../shared/usuario/usuario.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { StorageComponent } from './storage/storage.component';
import { StorageItemComponent } from './storage-item/storage-item.component';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
      { path: 'storage', component: StorageComponent, canActivate: [AuthGuard] },
      { path: 'register/:id', component: StorageItemComponent, canActivate: [AuthGuard] },        
      { path: 'perfil', component: UsuarioComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
