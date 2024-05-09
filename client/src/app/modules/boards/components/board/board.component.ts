import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateBoardComponent } from 'src/app/modules/modals/components/create-board/create-board.component';
import { EditBoardComponent } from 'src/app/modules/modals/components/edit-board/edit-board.component';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap, take, throwError } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  bsModalRef: BsModalRef<CreateBoardComponent | EditBoardComponent> = new BsModalRef<CreateBoardComponent | EditBoardComponent>();
  isHistoryVisible = false;
  
  constructor(public boardsService: BoardsService, private activatedRoute: ActivatedRoute, private router: Router, 
      private toastr: ToastrService, private modalService: BsModalService, private location: Location){}

  ngOnInit(): void {
    this.getBoard();
  }

  getBoard(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.boardsService.getBoard(+id).subscribe({
      next: board => this.boardsService.setBoard(board)
    })
  }

  deleteBoard() {
    this.boardsService.board$.pipe(
      take(1),
      switchMap(board => {
        if (!board) {
          return throwError('Board not found');
        }
        return this.boardsService.deleteBoard(board.id);
      }),
      catchError(error => {
        this.toastr.error('Failed to delete board');
        return of(null);
      })
    ).subscribe(() => {
      this.toastr.success('Board has been successfully deleted');
      this.router.navigateByUrl('/');
    });
  }

  createBoardModal(){
    this.bsModalRef = this.modalService.show(CreateBoardComponent);
  }

  editBoardModal() {
    let id: number;
    let name: string;
  
    this.boardsService.board$.pipe(take(1)).subscribe(board => {
      if (board) {
        id = board.id;
        name = board.name;
  
        const initialState: ModalOptions = {
          initialState: {
            boardId: id,
            boardName: name
          }
        };
  
        this.bsModalRef = this.modalService.show(EditBoardComponent, initialState);
      } else {
        this.toastr.error('Board not found');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleHistory(){
    this.isHistoryVisible = !this.isHistoryVisible;
  }
}