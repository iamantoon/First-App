import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient){}

  addCard(card: Card){
    return this.http.post('http://localhost:5000/cards/', card);
  }

  editCard(id: number, card: Card){
    return this.http.post('http://localhost:5000/cards/' + id, card);
  }

  deleteCard(id: number){
    return this.http.delete('http://localhost:5000/cards/' + id);
  }
}