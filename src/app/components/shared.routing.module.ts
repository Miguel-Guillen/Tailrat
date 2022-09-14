import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'inventory' },
  // { path: 'inventory', component: InventoryComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
