import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  title = '';
  description = '';
  list: any;
  editCardForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.initializeForm();
    const currentDay = this.minDate.getDate();
    const currentMonth = this.minDate.getMonth() + 1;
    const currentYear = this.minDate.getFullYear();
    this.minDate.setFullYear(currentYear - 18);
  }

  initializeForm(){
    this.editCardForm = new FormGroup({
      moveTo: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required)
    });
  }
}