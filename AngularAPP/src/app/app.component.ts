import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private commonService: CommonService
  ) {
  }
  loader = this.loaderService.loader;
  isLoggedIn = this.authService.isLoggedIn;
  hasToolbar = this.commonService.hasToolbar;
}
