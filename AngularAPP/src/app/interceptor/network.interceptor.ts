import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    if (request.headers.get("Content-Type") == "multipart/form-data") {
      //request.headers.delete("Content-Type");
      request = request.clone({ headers: request.headers.delete("Content-Type") });
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.removeItem("access_token");
          var snackBarRef = this.commonService.showSnakBar("You are not authorize.", "error");
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl("/auth/login");
            this.authService.validateToken();
          });
        }
        else {
          var snackBarRef = this.commonService.showSnakBar(err.error.message, "error", "top", 3000);
        }
        return throwError(err);
      })
    );
  }
}
