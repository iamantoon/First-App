import { Component, OnInit } from '@angular/core';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { List } from '../../models/list';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardsService } from 'src/app/modules/cards/services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { FormatDateService } from '../../services/format-date.service';
import { catchError, of, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';
import { ListsService } from 'src/app/modules/lists/services/lists.service';
import { Store } from '@ngrx/store';
import { editCard } from 'src/app/modules/core/store/actions/board.action';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  cardId?: number; // card id
  cardName?: string; // card name
  description?: string; // card description
  dueDate?: string; // card date
  priority?: string; // card priority
  listName?: string; // list name
  listId?: number; // list id
  boardId?: number;
  lists: ListsWithIds[] = []; // all current lists
  priorities: string[] = []; // all priorities
  editCardForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();
  listObject: List = {};
  
  constructor(private fb: FormBuilder, private store: Store, public bsModalRef: BsModalRef, 
    private toastr: ToastrService, private formatDateService: FormatDateService, public listsService: ListsService){}

  ngOnInit(): void {
    this.listObject = {name: this.listName, id: this.listId};
    this.initializeForm();
  }

  initializeForm(){
    this.editCardForm = this.fb.group({
      name: [this.cardName, Validators.required],
      listInfo: [this.listObject, Validators.required],
      dueDate: [new Date(this.dueDate as string), Validators.required],
      priority: [this.priority, Validators.required],
      description: [this.description, Validators.required]
    });
  }

  saveChanges() {
    if (this.editCardForm.valid && this.cardId) {
      const cardData = {
        name: this.editCardForm.value['name'],
        description: this.editCardForm.value['description'],
        dueDate: this.formatDateService.formatDate(this.editCardForm.value['dueDate']),
        priority: this.editCardForm.value['priority'],
        listId: this.editCardForm.value['listInfo'].id,
        boardId: this.boardId
      };
      this.store.dispatch(editCard({payload: {id: this.cardId, ...cardData}}));
      this.bsModalRef.hide();
    } else {
      this.toastr.error('Please fill all fields');
    }
  }

  changeList(list: List){
    this.editCardForm.get('listInfo')?.setValue(list);
  }

  changePriority(priority: string){
    this.editCardForm.get('priority')?.setValue(priority);
  }
}