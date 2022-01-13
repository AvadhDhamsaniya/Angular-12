import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MaterialsModule } from '../materials/materials.module';
import { DataPropertyGetterPipe } from 'src/app/pipe/data-property-getter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafeHtmlPipe } from 'src/app/pipe/safe-html.pipe';

@NgModule({
  declarations: [TableComponent, DataPropertyGetterPipe, SafeHtmlPipe],
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule
  ],
  exports: [TableComponent]
})
export class SharedModule { }
