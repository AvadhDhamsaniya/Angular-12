import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolvModuleComponent } from './solv-module-list/solv-module-list.component';

const routes: Routes = [
  {
    path: "",
    component: SolvModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolvModuleRoutingModule { }
