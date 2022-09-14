import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./components/shared.module').then( m => m.SharedModule)
  // }
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
