import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ModuleClass } from '../model/module';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { SolvModuleService } from '../services/solv-module.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  moduleList: ModuleClass[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private moduleService: SolvModuleService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  loadModuleList() {
    this.moduleService.getAll().pipe(
      map((res: ModuleClass[]) => {
        if (res && res.length > 0) {
          this.moduleList = res.filter(m => m.isActive);
        }
      })
    ).subscribe();
  }

  createEvent(module: ModuleClass) {
    this.router.navigateByUrl("/form/add/" + module.id);
  }

  logout() {
    localStorage.removeItem("access_token");
    this.router.navigateByUrl("/auth/login");
    this.authService.validateToken();
  }

}
