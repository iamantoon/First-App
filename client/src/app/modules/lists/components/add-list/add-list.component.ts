import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  @Output() changeEditMode = new EventEmitter();
  titleInput: any = '';

  constructor(private listsService: ListsService){}

  ngOnInit(): void {}

  addNewList(){
    console.log(this.titleInput);
    this.listsService.addList(this.titleInput);
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}
