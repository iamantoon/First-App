import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Activity } from 'src/app/modules/history/models/activity';
import { HistoryService } from 'src/app/modules/history/services/history.service';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { ListsWithIds } from 'src/app/modules/lists/models/list';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.css']
})
export class OpenCardComponent implements OnInit {
  id?: number;
  name = '';
  description = '';
  dueDate = '';
  priority = '';
  list = '';
  activities: Activity[] = [];

  listId?: number; 
  lists: ListsWithIds[] = []; 
  priorities: string[] = [];
  
  constructor(private historyService: HistoryService, public bsModalRef: BsModalRef, private modalService: BsModalService){}

  ngOnInit(): void {
    this.id && this.getCardActivity(this.id);
  }

  getCardActivity(id: number){
    this.historyService.getLoggedActivityByCardId(id).subscribe({
      next: response => this.activities = response
    })
  }

  editCard(){
    const initialState: ModalOptions = {
      initialState: {
        cardId: this.id,
        cardName: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        listName: this.list,
        listId: this.listId,
        lists: this.lists,
        priorities: this.priorities
      }
    }
    this.bsModalRef.hide();
    this.bsModalRef = this.modalService.show(EditCardComponent, initialState);
  }
}
