import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Board, BoardName, EditBoard } from '../models/board';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  baseUrl = environment.apiUrl + 'boards/';
  boardSubject: BehaviorSubject<Board | null> = new BehaviorSubject<Board | null>(null);
  board$: Observable<Board | null> = this.boardSubject.asObservable();

  boardNamesSubject: BehaviorSubject<BoardName[] | null> = new BehaviorSubject<BoardName[] | null>(null);
  boardNames$: Observable<BoardName[] | null> = this.boardNamesSubject.asObservable();

  constructor(private http: HttpClient){}

  getBoards(){
    return this.http.get<BoardName[]>(this.baseUrl).pipe(
      map(response => {
        this.boardNamesSubject.next(response);
        return response;
      })
    )
  }

  getBoard(id: number){
    return this.http.get<Board>(this.baseUrl + id).pipe(
      map(response => {
        this.boardSubject.next(response);
        return response;
      })
    )
  }

  createBoard(name: string){
    return this.http.post(this.baseUrl, {name});
  }

  editBoard(editedBoard: EditBoard){
    return this.http.patch(this.baseUrl, {id: editedBoard.id, name: editedBoard.name});
  }

  deleteBoard(id: number){
    return this.http.delete(this.baseUrl + id);
  }

  setBoard(board: Board){
    this.boardSubject.next(board);
  }

  setBoardNames(boards: BoardName[]){
    this.boardNamesSubject.next(boards);
  }
}