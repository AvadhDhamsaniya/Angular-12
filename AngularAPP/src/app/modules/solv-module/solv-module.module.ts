import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolvModuleRoutingModule } from './solv-module-routing.module';
import { SolvModuleComponent } from './solv-module-list/solv-module-list.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolvModuleAddComponent } from './solv-module-add/solv-module-add.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SolvModuleEditComponent } from './solv-module-edit/solv-module-edit.component';

@NgModule({
  declarations: [
    SolvModuleComponent,
    SolvModuleAddComponent,
    SolvModuleEditComponent
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
