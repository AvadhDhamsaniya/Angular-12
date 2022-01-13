import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.authApiUrl + "/api/auth/";

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private _httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginModel: any) {

    var options = { headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") };
    let body = new URLSearchParams();
    body.set('client_id', 'client_id');
    body.set('scope', 'apiscope');
    body.set('client_secret', 'apisecret');
    body.set('grant_type', 'password');
    body.set('username', loginModel.UserName);
    body.set('password', loginModel.Password);

    return this._httpClient.post("https://localhost:44393/connect/token", body, options);
    //return this._httpClient.post(this.baseUrl + "login", loginModel);
  }

  register(registerModel: any) {
    return this._httpClient.post(this.baseUrl + "register", registerModel);
  }

  validateToken() {
    var isTokenValid = !this.jwtHelper.isTokenExpired();
    this._isLoggedIn.next(isTokenValid);
    return isTokenValid;
  }

  refreshToken() {
    return this._httpClient.post(this.baseUrl + "refreshtoken", null);
  }

  getUserTotal(): Observable<number> {
    return this._httpClient.get<number>(this.baseUrl + "get/user-count");
  }
}
