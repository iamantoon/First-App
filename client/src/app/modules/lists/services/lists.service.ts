import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateList, EditList } from '../models/list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  baseUrl = environment.apiUrl + 'lists/';

  constructor(private http: HttpClient){}

  createList(newList: CreateList){
    return this.http.post(this.baseUrl, {name: newList.name, boardId: newList.boardId});
  }

  editList(editedList: EditList){
    return this.http.patch(this.baseUrl, {id: editedList.listId, name: editedList.name});
  }

  deleteList(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}