import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { CreateBoardComponent } from 'src/app/modules/modals/components/create-board/create-board.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { selectBoards, selectSortedBoards } from 'src/app/modules/core/store/selectors/boards.selector';
import { deleteBoard, getBoards } from 'src/app/modules/core/store/actions/boards.action';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  bsModalRef: BsModalRef<CreateBoardComponent> = new BsModalRef<CreateBoardComponent>();
  // boards$ = this.store.pipe(select(selectBoards));
  boards$ = this.store.pipe(select(selectSortedBoards));

  constructor(public boardsService: BoardsService, private toastr: ToastrService, 
    private modalService: BsModalService, private store: Store){}

  ngOnInit(): void {
    this.store.dispatch(getBoards());
  }

  getBoardNames(){
    this.boardsService.getBoards().subscribe({
      next: boards => {
        this.boardsService.setBoardNames(boards);
      }
    })
  }

  deleteBoard(id: number){
    this.store.dispatch(deleteBoard({id}));
  }

  createBoardModal(){
    console.log('create board modal');
    this.bsModalRef = this.modalService.show(CreateBoardComponent);
  }
}