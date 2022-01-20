import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDesignAddEditComponent } from './form-design-add-edit/form-design-add-edit.component';

const routes: Routes = [
  {
    path: "formdesign/:id/:moduleId",
    component: FormDesignAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDesignRoutingModule { }
