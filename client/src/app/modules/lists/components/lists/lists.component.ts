import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List, ListsWithIds } from '../../models/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  listsNames: ListsWithIds[] = [];
  createListMode = false;

  constructor(private listsService: ListsService){}

  ngOnInit(): void {
    this.getLists();
  }

  getLists(){
    this.listsService.getLists().subscribe({
      next: lists => {
        this.lists = lists.lists;
        this.listsNames = lists.listNames;
      }
    })
  }

  changeMode(){
    this.createListMode = !this.createListMode;
  }
}