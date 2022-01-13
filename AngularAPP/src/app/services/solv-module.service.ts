import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleClass } from '../model/module';

@Injectable({
  providedIn: 'root'
})
export class SolvModuleService {

  baseUrl: string = environment.apiUrl + "/api/module/";

  constructor(private _httpClient: HttpClient) { }

  addModule(module: ModuleClass): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "add", module);
  }

  editModule(module: ModuleClass): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "update", module);
  }

  getAll(): Observable<ModuleClass[]> {
    return this._httpClient.post<ModuleClass[]>(this.baseUrl + "get-all", null);
  }

  getModule(id: number): Observable<ModuleClass> {
    return this._httpClient.get<ModuleClass>(this.baseUrl + "get/" + id);
  }

  deleteModule(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this.baseUrl + "delete/" + id);
  }

  toggleModuleActiveness(id: number, isActive: boolean) {
    return this._httpClient.post<boolean>(this.baseUrl + "activate/" + id + "/" + isActive, null);
  }
}
