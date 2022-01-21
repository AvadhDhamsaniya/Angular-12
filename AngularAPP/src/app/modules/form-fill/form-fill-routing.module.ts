import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormFillComponent } from './form-fill/form-fill.component';

const routes: Routes = [
  {
    path: "add/:moduleId",
    component: FormFillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFillRoutingModule { }
