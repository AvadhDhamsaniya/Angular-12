import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignRoutingModule } from './form-design-routing.module';
import { FormDesignAddEditComponent } from './form-design-add-edit/form-design-add-edit.component';
import { MaterialsModule } from '../materials/materials.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { FormPluginDesignComponent } from './form-plugin-design/form-plugin-design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule
  ]
})
export class FormDesignModule { }
