import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/modules/cards/models/card';
import { AddCardComponent } from 'src/app/modules/modals/components/add-card/add-card.component';
import { ListsWithIds } from '../../models/list';
import { Store } from '@ngrx/store';
import { deleteList } from 'src/app/modules/core/store/actions/board.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() listName?: string;
  @Input() listId?: number;
  @Input() boardId?: number;
  @Input() count?: number;
  @Input() cards: Card[] = [];
  @Input() lists: ListsWithIds[] = [];
  @Input() priorities: string[] = [];
  editListMode = false;
  bsModalRef: BsModalRef<AddCardComponent> = new BsModalRef<AddCardComponent>();
  @Input() ordinalNumber?: number;
  rightContextMenu = true;

  constructor(private store: Store, private modalService: BsModalService){}

  deleteList(id: number) {
    this.store.dispatch(deleteList({id}));
  } 
  
  openCreateCardModal(){
    const initialState: ModalOptions = {
      initialState: {
        lists: this.lists,
        priorities: this.priorities,
        listId: this.listId,
        boardId: this.boardId,
        listName: this.listName
      }
    }
    this.bsModalRef = this.modalService.show(AddCardComponent, initialState);
  }

  changeEditMode(){
    this.editListMode = !this.editListMode;
  }

  isDivisibleByFour(num: number): boolean {
    return num % 4 === 0;
  }
}
