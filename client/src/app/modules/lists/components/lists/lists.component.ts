import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  createListMode = false;

  constructor(private listsService: ListsService){}

  ngOnInit(): void {
    this.getLists();
  }

  getLists(){
    this.listsService.getLists().subscribe({
      next: lists => this.lists = lists
    })
  }

  changeMode(){
    this.createListMode = !this.createListMode;
  }
}