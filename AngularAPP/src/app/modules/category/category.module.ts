import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { MaterialsModule } from '../materials/materials.module';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoryAddEditDialogComponent } from './category-add-edit-dialog/category-add-edit-dialog.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddEditComponent,
    CategoryAddEditDialogComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
