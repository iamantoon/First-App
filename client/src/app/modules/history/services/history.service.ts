import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityResponse } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = 'http://localhost:5000/api/activity';

  constructor(private http: HttpClient){}

  getLoggedActivity(pageSize: number = 7){  
    let params = new HttpParams().set('pageSize', pageSize.toString());

    return this.http.get<ActivityResponse>(this.baseUrl, {params});
  }
}
