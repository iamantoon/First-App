import { Component, Input } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditBoardComponent } from 'src/app/modules/modals/components/edit-board/edit-board.component';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent {
  @Input() name = '';
  @Input() id?: number;
  bsModalRef: BsModalRef<EditBoardComponent> = new BsModalRef<EditBoardComponent>();

  constructor(private boardsService: BoardsService, private modalService: BsModalService, private toastr: ToastrService){}

  deleteBoard(id: number) {
    this.boardsService.deleteBoard(id).pipe(
      switchMap(() => this.boardsService.getBoards())
    ).subscribe({
      next: response => {
        this.boardsService.setBoardNames(response);
        this.toastr.success(`Board ${this.name} has been deleted`);
      }
    });
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