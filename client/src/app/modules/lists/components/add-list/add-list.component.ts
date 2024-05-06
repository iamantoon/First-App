import { Component, EventEmitter, Output } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  @Output() changeEditMode = new EventEmitter();
  titleInput = '';

  constructor(private listsService: ListsService, private toastr: ToastrService){}

  createNewList() {
    this.listsService.createList(this.titleInput).pipe(
      switchMap(() => this.listsService.getLists()),
      finalize(() => this.changeMode())
    ).subscribe({
      next: response => {
        this.listsService.setLists(response);
        this.toastr.success(`The list ${this.titleInput} has been created`);
      }
    });
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}