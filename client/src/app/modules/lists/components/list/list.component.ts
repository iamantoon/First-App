import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/modules/cards/models/card';
import { AddCardComponent } from 'src/app/modules/modals/components/add-card/add-card.component';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { ListsWithIds } from '../../models/list';
import { switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

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

  constructor(private listsService: ListsService, private boardsService: BoardsService, private modalService: BsModalService, private toastr: ToastrService){}

  deleteList(id: number) {
    this.listsService.deleteList(id).pipe(
      switchMap(() => this.boardsService.getBoard(this.boardId!))
    ).subscribe({
      next: response => {
        this.boardsService.boardSubject.next(response);
        this.toastr.success('List has been deleted');
      }
    });
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
