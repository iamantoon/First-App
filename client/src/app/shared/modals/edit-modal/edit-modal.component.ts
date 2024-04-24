import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  name?: string;
  description?: string;
  dueDate?: string;
  priority?: 'Low' | 'Medium' | 'High';
  list?: string;

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
      name: new FormControl(this.name, Validators.required),
      list: new FormControl(this.list, Validators.required),
      dueDate: new FormControl(this.dueDate, Validators.required),
      priority: new FormControl(this.priority, Validators.required),
      description: new FormControl(this.description, Validators.required)
    });
  }

  saveChanges(){
    // PATCH /cards/:id
    // POST  /cards 
    this.bsModalRef.hide()
  }
}