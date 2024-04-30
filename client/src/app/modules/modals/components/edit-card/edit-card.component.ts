import { Component, OnInit } from '@angular/core';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { List } from '../../models/list';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardsService } from 'src/app/modules/cards/services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { FormatDateService } from '../../services/format-date.service';

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
  lists: ListsWithIds[] = []; // all current lists
  priorities: string[] = []; // all priorities
  editCardForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();
  listObject: List = {};
  
  constructor(private fb: FormBuilder, private cardsService: CardsService, public bsModalRef: BsModalRef, 
    private toastr: ToastrService, private formatDateService: FormatDateService){}

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

  saveChanges(){
    if (this.editCardForm.valid && this.cardId) {
      this.cardsService.editCard(
        this.cardId, 
        {
          ...this.editCardForm.value, 
          listId: this.editCardForm.value['listInfo'].id,
          dueDate: this.formatDateService.formatDate(this.editCardForm.value['dueDate'])
        }).subscribe({
        next: () => {
          this.toastr.success("Card has been updated");
        }
      });
      this.bsModalRef.hide();
    } else {
      this.toastr.error("Please fill all required fields");
    }
  }

  changeList(list: List){
    this.editCardForm.get('listInfo')?.setValue(list);
  }

  changePriority(priority: string){
    this.editCardForm.get('priority')?.setValue(priority);
    console.log(this.editCardForm.value);
  }
}