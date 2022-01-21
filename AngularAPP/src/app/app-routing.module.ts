import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then(mod => mod.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import('./modules/auth/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: "product",
    loadChildren: () => import('./modules/product/product.module')
      .then(mod => mod.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: "category",
    loadChildren: () => import('./modules/category/category.module')
      .then(mod => mod.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: "module",
    loadChildren: () => import('./modules/solv-module/solv-module.module')
      .then(mod => mod.SolvModuleModule),
    canActivate: [AuthGuard]
  },
  {
    path: "formdesign",
    loadChildren: () => import('./modules/form-design/form-design.module')
      .then(mod => mod.FormDesignModule),
    canActivate: [AuthGuard]
  },
  {
    path: "form",
    loadChildren: () => import('./modules/form-fill/form-fill.module')
      .then(mod => mod.FormFillModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
