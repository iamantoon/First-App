import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardsService } from 'src/app/modules/cards/services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { ListsWithIds } from 'src/app/modules/lists/models/list';
import { FormatDateService } from '../../services/format-date.service';
import { ListsService } from 'src/app/modules/lists/services/lists.service';
import { catchError, of, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

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

  constructor(private cardsService: CardsService, private boardsService: BoardsService, public bsModalRef: BsModalRef, private toastr: ToastrService,
    private formatDateService: FormatDateService, private listsService: ListsService) {}

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
      const cardData = {
        name: this.createCardForm.value['name'],
        description: this.createCardForm.value['description'],
        dueDate: this.formatDateService.formatDate(this.createCardForm.value['dueDate']),
        priority: this.createCardForm.value['priority'],
        listId: this.createCardForm.value['listInfo'].id, 
        boardId: this.boardId
      };
      this.cardsService.createCard(cardData).pipe(
        switchMap(() => this.boardsService.getBoard(this.boardId!)),
        catchError(error => {
          this.toastr.error("Failed to create card: " + error.message);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.boardsService.setBoard(response);
          this.toastr.success("Card has been created");
        }
      });
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
