import { Component, Input } from '@angular/core';
import { ModalOptions } from 'ngx-bootstrap/modal';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { deleteCard, editCard } from 'src/app/modules/core/store/actions/board.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id?: number;
  @Input() name?: string;
  @Input() description?: string;
  @Input() dueDate?: string;
  @Input() priority?: string;
  @Input() list?: string; 
  @Input() listId?: number;
  @Input() boardId?: number;
  @Input() lists: ListsWithIds[] = [];
  @Input() rightContextMenu?: boolean;
  priorities = ['Low', 'Medium', 'High'];

  constructor(private store: Store){}

  moveTo(move: number) {
    this.store.dispatch(editCard({
      payload: {
        id: this.id!, 
        listId: move, 
        boardId: this.boardId,
        name: this.name,
        description: this.description,
        priority: this.priority,
        dueDate: this.dueDate
      }
    }));
  }

  deleteCard(id: number) {
    this.store.dispatch(deleteCard({id}));
  } 
  
  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        cardId: this.id,
        cardName: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        listName: this.list,
        listId: this.listId,
        boardId: this.boardId,
        lists: this.lists,
        priorities: this.priorities
      }
    }
  }

  openCardModal(){
    const initialState: ModalOptions = {
      initialState: {
        id: this.id,
        name: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        list: this.list,
        listId: this.listId,
        boardId: this.boardId,
        lists: this.lists,
        priorities: this.priorities
      },
      class: 'modal-lg'
    }
  }
}