import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  totalProducts: number = 0;
  totalCategory: number = 0;
  totalUser: number = 0;
  totalModule: number = 0;

  ngOnInit(): void {
    this.dashboardService.getStatistics().pipe(
      map((res: any) => {
        if (res) {
          this.totalProducts = res.totalProduct;
          this.totalCategory = res.totalCategory;
          this.totalModule = res.totalModule;
          this.totalUser = res.totalUser;
        }
      })
    ).subscribe();
  }

}
