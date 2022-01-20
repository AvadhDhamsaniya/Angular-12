import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormDesign } from '../model/formDesign';

@Injectable({
  providedIn: 'root'
})
export class FormDesignService {

  baseUrl: string = environment.apiUrl + "/api/formdesign/";

  constructor(private _httpClient: HttpClient) { }

  addFormDesign(model: any): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "add", model);
  }

  editFormDesign(model: any): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "update", model);
  }

  getAll(moduleId: number): Observable<FormDesign[]> {
    return this._httpClient.post<FormDesign[]>(this.baseUrl + "get-all/" + moduleId, null);
  }

  getFormDesignDetail(id: number): Observable<FormDesign> {
    return this._httpClient.get<FormDesign>(this.baseUrl + "get/" + id);
  }

  deleteFormDesign(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this.baseUrl + "delete/" + id);
  }
}
