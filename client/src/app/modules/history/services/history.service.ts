import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, ActivityResponse } from '../models/activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  baseUrl = environment.apiUrl + 'activity/';

  constructor(private http: HttpClient){}

  getLoggedActivity(boardId: number, pageSize: number){  
    let params = new HttpParams().set('pageSize', pageSize.toString());
    params = params.set('boardId', boardId.toString());

    return this.http.get<ActivityResponse>(this.baseUrl, {params});
  }

  getLoggedActivityByCardId(cardId: number){
    return this.http.get<Activity[]>(this.baseUrl + cardId);
  }
}
