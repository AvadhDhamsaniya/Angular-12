import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    var loginModel = {
      UserName: this.loginFormGroup.value.username,
      Password: this.loginFormGroup.value.password
    }
    this.authService.login(loginModel).pipe(
      map((res: any) => {
        if (res && res.access_token) {
          localStorage.setItem("access_token", res.access_token);
          this.router.navigateByUrl("/");
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error.error_description == "invalid_username_or_password") {
          this.commonService.showSnakBar("Invalid Username or Password.", "error");
          return "";
        }
        else {
          return throwError(err);
        }
      })
    ).subscribe();
  }
}
