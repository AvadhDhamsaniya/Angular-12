import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryClass } from '../model/category';
import { DataTable } from '../model/dataTable';
import { DataTableSort } from '../model/dataTableSort';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = environment.apiUrl + "/api/category/";

  constructor(private _httpClient: HttpClient) { }

  getAll(metaData: DataTableSort): Observable<DataTable> {
    return this._httpClient.post<DataTable>(this.baseUrl + "get-all", metaData);
  }

  addCategory(category: CategoryClass): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "add", category);
  }

  editCategory(newCategory: CategoryClass): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "update", newCategory);
  }

  getCategory(id: number): Observable<CategoryClass> {
    return this._httpClient.get<CategoryClass>(this.baseUrl + "get/" + id);
  }

  deleteCategory(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this.baseUrl + "delete/" + id);
  }

  getCategoryTotal(): Observable<number> {
    return this._httpClient.get<number>(this.baseUrl + "get/count");
  }
}
