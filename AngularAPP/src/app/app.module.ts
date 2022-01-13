import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials/materials.module';
import { ConfirmDialogComponent } from './modules/common/confirm-dialog/confirm-dialog.component';
import { CommonDialogComponent } from './modules/common/common-dialog/common-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './interceptor/network.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    CommonDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44307"],
        disallowedRoutes: ["https://localhost:44393/api/auth/"]
      }
    }),
    NgxDropzoneModule,
    Ng2SearchPipeModule
  ],
  exports: [MaterialsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem("access_token");
}