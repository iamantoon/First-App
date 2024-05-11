import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditBoardComponent } from 'src/app/modules/modals/components/edit-board/edit-board.component';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/modules/core/store/actions/boards.action';
import { selectBoards, selectSortedBoards } from 'src/app/modules/core/store/selectors/boards.selector';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
  @Input() name = '';
  @Input() id?: number;
  bsModalRef: BsModalRef<EditBoardComponent> = new BsModalRef<EditBoardComponent>();
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store, private modalService: BsModalService){}

  ngOnInit(): void {
    this.store.select(selectSortedBoards)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(success => {
        if (success) {
          this.bsModalRef.hide();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteBoard(id: number) {
    this.store.dispatch(deleteBoard({id}));
  }
  
  editBoardModal(id: number, name: string){
    const initialState: ModalOptions = {
      initialState: {
        boardId: id,
        boardName: name
      }
    }
    this.bsModalRef = this.modalService.show(EditBoardComponent, initialState);
  }
}