import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { createList } from 'src/app/modules/core/store/actions/board.action';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  @Output() changeEditMode = new EventEmitter();
  @Input() boardId?: number;
  titleInput = '';

  constructor(private store: Store){}

  createNewList() {
    this.boardId && this.store.dispatch(createList({list: {name: this.titleInput, boardId: this.boardId}}));
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}