import { Injectable } from '@angular/core';
import { ProductClass } from 'src/app/model/product';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTable } from '../model/dataTable';
import { DataTableSort } from '../model/dataTableSort';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  baseUrl: string = environment.apiUrl + "/api/product/";

  constructor(private _httpClient: HttpClient) { }

  options = { headers: new HttpHeaders().set("Content-Type", "multipart/form-data") };

  getAll(metaData: DataTableSort): Observable<DataTable> {
    return this._httpClient.post<DataTable>(this.baseUrl + "get-all", metaData);
  }

  addProductDetail(formData: FormData): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "add", formData, this.options);
  }

  editProductDetail(formData: FormData): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "update", formData, this.options);
  }

  getProductDetail(id: number, fromExpand: boolean = false): Observable<ProductClass> {
    return this._httpClient.get<ProductClass>(this.baseUrl + "get/" + id + "/" + fromExpand);
  }

  deleteProductDetail(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this.baseUrl + "delete/" + id);
  }

  getProductTotal(): Observable<number> {
    return this._httpClient.get<number>(this.baseUrl + "get/count");
  }
}
