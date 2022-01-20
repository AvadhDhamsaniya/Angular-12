import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialsModule } from '../materials/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    PipeModule
  ],
  exports: [TableComponent]
})
export class SharedModule { }
