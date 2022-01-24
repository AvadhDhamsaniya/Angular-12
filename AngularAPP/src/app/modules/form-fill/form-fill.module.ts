import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFillRoutingModule } from './form-fill-routing.module';
import { FormFillComponent } from './form-fill/form-fill.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialsModule } from '../materials/materials.module';
import { FormFillPluginTemplateComponent } from './form-fill-plugin-template/form-fill-plugin-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormFillComponent,
    FormFillPluginTemplateComponent
  ],
  imports: [
    CommonModule,
    FormFillRoutingModule,
    SharedModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormFillModule { }
