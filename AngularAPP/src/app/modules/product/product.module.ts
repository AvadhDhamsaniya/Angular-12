import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MaterialsModule } from '../materials/materials.module';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddEditComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
    FlexLayoutModule,
    NgxDropzoneModule
  ]
})
export class ProductModule { }
