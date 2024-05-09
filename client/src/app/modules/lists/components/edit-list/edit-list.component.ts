import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  @Output() changeEditMode = new EventEmitter();
  @Input() name?: string;
  @Input() id?: number;
  @Input() boardId?: number;
  initialName? = '';

  constructor(private listsService: ListsService, private boardsService: BoardsService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.initialName = this.name;
  }
  
  editList() {
    if (this.name && this.id){
      this.listsService.editList({listId: this.id, name: this.name}).pipe(
        switchMap(() => this.boardsService.getBoard(this.boardId!)),
        finalize(() => this.changeMode())
      ).subscribe({
        next: response => {
          this.boardsService.setBoard(response);
          this.toastr.success(`The list ${this.name} has been updated`);
        }
      });
    }
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}