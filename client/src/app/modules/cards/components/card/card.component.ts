import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CardsService } from '../../services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { EditCardComponent } from 'src/app/modules/modals/components/edit-card/edit-card.component';
import { OpenCardComponent } from 'src/app/modules/modals/components/open-card/open-card.component';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';
import { deleteCard, editCard } from 'src/app/modules/core/store/actions/board.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id?: number; // card id
  @Input() name?: string;
  @Input() description?: string;
  @Input() dueDate?: string;
  @Input() priority?: string;
  @Input() list?: string; // list name
  @Input() listId?: number; // list id
  @Input() boardId?: number;
  @Input() lists: ListsWithIds[] = [];
  @Input() rightContextMenu?: boolean;
  priorities = ['Low', 'Medium', 'High'];
  bsModalRef: BsModalRef<EditCardComponent | OpenCardComponent> = new BsModalRef<EditCardComponent | OpenCardComponent>();

  constructor(private store: Store, private modalService: BsModalService, ){}

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
    this.bsModalRef = this.modalService.show(EditCardComponent, initialState);
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
    this.bsModalRef = this.modalService.show(OpenCardComponent, initialState);
  }
}
