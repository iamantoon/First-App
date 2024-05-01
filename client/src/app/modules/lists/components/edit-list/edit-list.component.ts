import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent {
  @Output() changeEditMode = new EventEmitter();
  @Input() name?: string;
  @Input() id?: number;

  constructor(private listsService: ListsService, private toastr: ToastrService){}
    
  editList() {
    if (this.name && this.id){
      this.listsService.editList(this.id, this.name).pipe(
        switchMap(() => this.listsService.getLists()),
        finalize(() => this.changeMode())
      ).subscribe({
        next: response => {
          this.listsService.setLists(response);
          this.toastr.success(`The list ${this.name} has been updated`);
        }
      });
    }
  } 

  changeMode(){
    this.changeEditMode.emit();
  }
}
