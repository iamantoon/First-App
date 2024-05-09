import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  boardId?: number;
  boardName?: string;
  editBoardForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private boardsService: BoardsService, private toastr: ToastrService, public bsModalRef: BsModalRef){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.editBoardForm = this.fb.group({
      name: [this.boardName, Validators.required],
    });
  }

  editBoard() {
    if (this.boardName && this.boardId) {
      const editBoard$ = this.boardsService.editBoard({ id: this.boardId, name: this.editBoardForm.value['name'] });
  
      editBoard$.pipe(
        switchMap(() => forkJoin([
          this.boardsService.getBoard(this.boardId!),
          this.boardsService.getBoards()
        ]))
      ).subscribe({
        next: ([board, boards]) => {
          this.boardsService.setBoard(board);
          this.boardsService.setBoardNames(boards);
          this.toastr.success(`The board ${this.editBoardForm.value['name']} has been updated`);
          this.bsModalRef.hide();
        },
        error: err => {
          this.toastr.error('Something unexpected went wrong');
        }
      });
    }
  }
}