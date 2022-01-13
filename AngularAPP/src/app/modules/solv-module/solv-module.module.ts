import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolvModuleRoutingModule } from './solv-module-routing.module';
import { SolvModuleComponent } from './solv-module-list/solv-module-list.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolvModuleAddEditComponent } from './solv-module-add-edit/solv-module-add-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    SolvModuleComponent,
    SolvModuleAddEditComponent
  ],
  imports: [
    CommonModule,
    SolvModuleRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatMenuModule,
    Ng2SearchPipeModule
  ]
})
export class SolvModuleModule { }
