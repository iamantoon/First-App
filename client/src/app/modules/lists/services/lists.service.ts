import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  baseUrl = 'http://localhost:5000/api/lists/';

  constructor(private http: HttpClient){}

  getLists(){
    return this.http.get<List[]>(this.baseUrl);
  }

  createList(name: string){
    return this.http.post(this.baseUrl, {name});
  }

  editList(id: number, name: string){
    return this.http.patch(this.baseUrl, {id, name});
  }

  deleteList(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}