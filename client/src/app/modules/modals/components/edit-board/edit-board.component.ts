import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { editBoard } from 'src/app/modules/core/store/actions/boards.action';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  boardId?: number;
  boardName?: string;
  editBoardForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store, public bsModalRef: BsModalRef){}

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
      this.store.dispatch(editBoard({payload: {id: this.boardId, name: this.editBoardForm.value['name']}}));
      this.bsModalRef.hide();
    } 
  }
}