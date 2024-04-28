import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';

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

  editList(){
    if (this.name && this.id){
      this.listsService.editList(this.id, this.name).subscribe({
        next: () => this.toastr.success("The list has been updated")
      })
    }
    this.changeMode();
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}
