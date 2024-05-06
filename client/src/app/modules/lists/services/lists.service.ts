import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lists } from '../models/list';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  baseUrl = environment.apiUrl + 'lists/';
  listsSubject: BehaviorSubject<Lists> = new BehaviorSubject<Lists>({lists: [], listNames: []});
  lists$: Observable<Lists> = this.listsSubject.asObservable(); 

  constructor(private http: HttpClient){}

  getLists(){
    return this.http.get<Lists>(this.baseUrl).pipe(
      map(response => {
        this.listsSubject.next(response);
        return response;
      })
    )
  }

  setLists(lists: Lists){
    this.listsSubject.next(lists);
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