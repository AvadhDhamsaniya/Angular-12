import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { DataPropertyGetterPipe } from './data-property-getter.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    DataPropertyGetterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SafeHtmlPipe,
    DataPropertyGetterPipe
  ]
})
export class PipeModule { }
