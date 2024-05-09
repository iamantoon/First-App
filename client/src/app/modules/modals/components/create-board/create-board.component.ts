import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {
  createBoardForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private boardsService: BoardsService, private toastr: ToastrService, public bsModalRef: BsModalRef){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.createBoardForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createBoard(){
    this.boardsService.createBoard(this.createBoardForm.value['name']).pipe(
      switchMap(() => this.boardsService.getBoards()),
      finalize(() => this.bsModalRef.hide())
    ).subscribe({
      next: response => {
        this.boardsService.setBoardNames(response);
        this.toastr.success(`The board ${this.createBoardForm.value['name']} has been created`);
      }
    });
  }
}