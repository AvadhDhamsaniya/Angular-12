import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = environment.apiUrl + "/api/dashboard/";

  constructor(private _httpClient: HttpClient) { }

  getStatistics() {
    return this._httpClient.get(this.baseUrl + "statistics");
  }
}
