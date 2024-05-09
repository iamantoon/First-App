import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { CreateBoardComponent } from 'src/app/modules/modals/components/create-board/create-board.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  bsModalRef: BsModalRef<CreateBoardComponent> = new BsModalRef<CreateBoardComponent>();

  constructor(public boardsService: BoardsService, private toastr: ToastrService, private modalService: BsModalService){}

  ngOnInit(): void {
    this.getBoardNames();
  }

  getBoardNames(){
    this.boardsService.getBoards().subscribe({
      next: boards => {
        this.boardsService.setBoardNames(boards);
      }
    })
  }

  deleteBoard(id: number){
    this.boardsService.deleteBoard(id).subscribe({
      next: () => {
        this.toastr.success('Board has been sucessfully deleted');
        this.getBoardNames();
      }
    })
  }

  createBoardModal(){
    this.bsModalRef = this.modalService.show(CreateBoardComponent);
  }
}
