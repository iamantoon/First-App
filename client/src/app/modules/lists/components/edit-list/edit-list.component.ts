import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { editList } from 'src/app/modules/core/store/actions/board.action';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  @Output() changeEditMode = new EventEmitter();
  @Input() name?: string = 'Initial value';
  @Input() id?: number;
  @Input() boardId?: number;
  initialName? = '';

  constructor(private store: Store){}

  ngOnInit(): void {
    this.initialName = this.name;
  }
  
  editList() {
    if (this.name && this.id){
      this.store.dispatch(editList({list: {listId: this.id, name: this.name}}));
      this.changeMode();
    }
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}