import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { FormatDateService } from '../../services/format-date.service';
import { Store } from '@ngrx/store';
import { createCard } from 'src/app/modules/core/store/actions/board.action';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  createCardForm: FormGroup = new FormGroup({});
  lists: ListsWithIds[] = [];
  priorities: string[] = [];
  listId?: number;
  boardId?: number;
  listName?: string;
  minDate: Date = new Date();
  listObject: any = {};

  constructor(private store: Store, public bsModalRef: BsModalRef, private toastr: ToastrService, private formatDateService: FormatDateService) {}

  ngOnInit(): void {
    this.listObject = {id: this.listId, name: this.listName};
    this.initializeForm();
  }

  initializeForm(){
    this.createCardForm = new FormGroup({
      name: new FormControl('', Validators.required),
      listInfo: new FormControl(this.listObject, Validators.required),
      dueDate: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createCard() {
    if (this.createCardForm.valid) {
      const card = {
        name: this.createCardForm.value['name'],
        description: this.createCardForm.value['description'],
        dueDate: this.formatDateService.formatDate(this.createCardForm.value['dueDate']),
        priority: this.createCardForm.value['priority'],
        listId: this.createCardForm.value['listInfo'].id, 
        boardId: this.boardId
      };
      this.store.dispatch(createCard({card}));
      this.bsModalRef.hide();
    } else {
      this.toastr.error('Please fill all fields');
    } 
  }

  changeList(list: any){
    this.createCardForm.get('listInfo')?.setValue(list);
  }

  changePriority(priority: string){
    this.createCardForm.get('priority')?.setValue(priority);
  }
}