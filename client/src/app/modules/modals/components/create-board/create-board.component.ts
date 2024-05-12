import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { createBoard } from 'src/app/modules/core/store/actions/boards.action';
import { selectBoards } from 'src/app/modules/core/store/selectors/boards.selector';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {
  createBoardForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private store: Store, private toastr: ToastrService, public bsModalRef: BsModalRef){}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.createBoardForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createBoard(){
    this.store.dispatch(createBoard({board: {name: this.createBoardForm.value['name']}}));
    this.bsModalRef.hide();
  }
}