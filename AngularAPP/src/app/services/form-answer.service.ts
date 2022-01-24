import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormAnswers } from '../model/formAnswer';
import { FormDesign } from '../model/formDesign';

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {

  baseUrl: string = environment.apiUrl + "/api/formanswer/";

  constructor(private _httpClient: HttpClient) { }

  getDesignOfFirstForm(moduleId: number): Observable<FormDesign> {
    return this._httpClient.get<FormDesign>(this.baseUrl + "getdesign/" + moduleId);
  }

  create(moduleId: number, formAnswer: FormAnswers): Observable<boolean> {
    return this._httpClient.post<boolean>(this.baseUrl + "create/" + moduleId, formAnswer);
  }
}
