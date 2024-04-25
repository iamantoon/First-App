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

  constructor(private listsService: ListsService){}

  ngOnInit(): void {}

  editList(){
    console.log(this.name);
    if (this.name && this.id){
      this.listsService.editList(this.id, this.name);
    }
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}
