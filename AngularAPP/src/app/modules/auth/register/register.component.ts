import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private commonServices: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  registerFormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: confirmPasswordValidator });

  onSubmit() {
    var registerModel = {
      FullName: this.registerFormGroup.value.fullname,
      UserName: this.registerFormGroup.value.username,
      Password: this.registerFormGroup.value.password,
      ConfirmPassword: this.registerFormGroup.value.confirmPassword
    }

    this.authService.register(registerModel).pipe(
      map((res: any) => {
        if (res) {
          var snackBarRef = this.commonServices.showSnakBar("User successfully registered.", "success");
          snackBarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl("/auth/login");
          });
        } else {
          this.commonServices.showSnakBar("Something went wrong", "error");
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.commonServices.showSnakBar(err.error.text, "error");
        return throwError(err);
      })
    ).subscribe();
  }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.errors && !password.errors['confirmPasswordValidator']) {
    return null;
  }

  if (password?.value !== confirmPassword?.value) {
    confirmPassword?.setErrors({ noPassswordMatch: true });
  }
  else {
    confirmPassword?.setErrors(null);
  }
  return null;
};