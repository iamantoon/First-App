import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient){}

  getLists(){
    return this.http.get<List[]>('http://localhost:5000/lists');
  }

  addList(list: List){
    return this.http.post('http://localhost:5000/lists', list);
  }

  editList(id: number, name: string){
    return this.http.patch('http://localhost:5000/lists/' + id, name);
  }

  deleteList(id: number){
    return this.http.delete('http://localhost:5000/lists/' + id);
  }
}
