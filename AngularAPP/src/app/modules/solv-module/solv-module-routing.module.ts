import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolvModuleEditComponent } from './solv-module-edit/solv-module-edit.component';
import { SolvModuleComponent } from './solv-module-list/solv-module-list.component';

const routes: Routes = [
  {
    path: "",
    component: SolvModuleComponent
  },
  {
    path: "edit/:id",
    component: SolvModuleEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolvModuleRoutingModule { }
