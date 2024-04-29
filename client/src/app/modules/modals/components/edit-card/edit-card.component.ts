import { Component, OnInit } from '@angular/core';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
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
  id?: number;
  name?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  list?: string; // Maybe I should rename it
  listId?: number;
  lists: ListsWithIds[] = [];
  priorities: string[] = [];
  editCardForm: FormGroup = new FormGroup({});
  minDate: Date = new Date();
  listObject: any = {}; // {list: list, id: listId}
  
  constructor(private fb: FormBuilder, private cardsService: CardsService, public bsModalRef: BsModalRef, 
    private toastr: ToastrService, private formatDateService: FormatDateService){}

  ngOnInit(): void {
    this.listObject = {list: this.list, id: this.listId}
    this.initializeForm();
  }

  initializeForm(){
    this.editCardForm = this.fb.group({
      name: [this.name, Validators.required],
      listInfo: [this.listObject, Validators.required],
      dueDate: [this.dueDate, Validators.required],
      priority: [this.priority, Validators.required],
      description: [this.description, Validators.required]
    });
  }

  saveChanges(){
    if (this.editCardForm.valid && this.id) {
      this.cardsService.editCard(
        this.id, 
        {
          ...this.editCardForm.value, 
          listId: this.editCardForm.value['listInfo'].id,
          dueDate: this.formatDateService.formatDate(this.editCardForm.value['dueDate'])
        }).subscribe({
        next: () => {
          this.toastr.success("Card has been updated");
        }
      });
      console.log(this.editCardForm.value);
      this.bsModalRef.hide();
    } else {
      this.toastr.error("Please fill all required fields");
    }
  }

  changeList(list: any){
    this.editCardForm.get('listInfo')?.setValue(list);
    console.log(this.editCardForm.value);
  }

  changePriority(priority: string){
    this.editCardForm.get('priority')?.setValue(priority);
  }
}