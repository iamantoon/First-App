import { Component } from '@angular/core';
import { Activity } from 'src/app/modules/history/models/activity';
import { ListsWithIds } from 'src/app/modules/lists/models/list';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  id?: number;
  name = '';
  description = '';
  dueDate = '';
  priority = '';
  list = '';
  activities: any[] = [];
  listId?: number; 
  lists: ListsWithIds[] = []; 
  priorities: string[] = [];
  
  constructor(){}
}