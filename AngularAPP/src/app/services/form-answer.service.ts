import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormDesign } from '../model/formDesign';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {

  baseUrl: string = environment.apiUrl + "/api/formanswer/";

  constructor(private _httpClient: HttpClient) { }

  getDesignOfFirstForm(moduleId: number) {
    return this._httpClient.get<FormDesign>(this.baseUrl + "getdesign/" + moduleId);
  }
}
