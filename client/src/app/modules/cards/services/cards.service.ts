import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private baseUrl = environment.apiUrl + 'cards/';

  constructor(private http: HttpClient){}

  createCard(card: Partial<Card>){
    return this.http.post(this.baseUrl, card);
  }

  editCard(id: number, card: Partial<Card>){
    return this.http.patch(this.baseUrl, {id: id, ...card});
  }

  deleteCard(id: number){
    return this.http.delete(this.baseUrl + id);
  }
}