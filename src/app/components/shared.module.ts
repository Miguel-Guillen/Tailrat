import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    // InventoryComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    // FormsModule,
    // ReactiveFormsModule
  ]
})
export class SharedModule { }
