import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignRoutingModule } from './form-design-routing.module';
import { FormDesignAddEditComponent } from './form-design-add-edit/form-design-add-edit.component';
import { MaterialsModule } from '../materials/materials.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormPluginDesignComponent } from './form-plugin-design/form-plugin-design.component';

@NgModule({
  declarations: [
    FormDesignAddEditComponent,
    FormPluginDesignComponent
  ],
  imports: [
    CommonModule,
    FormDesignRoutingModule,
    MaterialsModule,
    PipeModule,
    NgJsonEditorModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class FormDesignModule { }
