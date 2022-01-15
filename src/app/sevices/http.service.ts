import { Condition } from './../models/condition.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';
import { Exam, ExamWrapper } from '../models/exam.model';
import { Login } from '../models/login.model';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData): Observable<Answer<boolean>> {
    return this.http.post<Answer<boolean>>(`${environment.BASE_URL}/UploadCoursesFile`, file);
  }
  sendCondition(condition: Condition): Observable<Answer<ExamWrapper>> {
    return this.http.post<Answer<ExamWrapper>>(`${environment.BASE_URL}/GetExamsSchedule`, condition);
  }
  login(login: Login): Observable<Answer<any>> {
    return this.http.post<Answer<any>>(`${environment.BASE_URL}/Login`, login);
  }
  getAllConditions(): Observable<Answer<string[]>> {
    return this.http.get<Answer<string[]>>(`${environment.BASE_URL}/GetAllConditions`);
  }
  getCondition(conditionName: string): Observable<Answer<any>> {
    return this.http.get<Answer<string[]>>(`${environment.BASE_URL}/GetCondition?name=${conditionName}`);
  }
}
