import { Component, Input, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List, ListsWithIds } from '../../models/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent {
  @Input() lists: List[] = [];
  @Input() listsNames: ListsWithIds[] = [];
  @Input() boardId?: number;
  createListMode = false;

  constructor(public listsService: ListsService){}

  changeMode(){
    this.createListMode = !this.createListMode;
  }
}