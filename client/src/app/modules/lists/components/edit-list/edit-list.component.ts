import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  @Output() changeEditMode = new EventEmitter();
  @Input() id?: number;
  @Input() name?: string;
  // titleInput: any = '';

  constructor(private listsService: ListsService){}

  ngOnInit(): void {}

  editList(){
    if (this.name){
      this.listsService.editList(1, this.name);
    }
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}
