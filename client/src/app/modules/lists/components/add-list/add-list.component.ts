import { Component, EventEmitter, Output } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  @Output() changeEditMode = new EventEmitter();
  titleInput = '';

  constructor(private listsService: ListsService, private toastr: ToastrService){}

  createNewList(){
    this.listsService.createList(this.titleInput).subscribe({
      next: () => {
        this.toastr.success(`The list ${this.titleInput} has been created`);
      }
    })
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}