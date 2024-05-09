import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, switchMap } from 'rxjs';
import { BoardsService } from 'src/app/modules/boards/services/boards.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  @Output() changeEditMode = new EventEmitter();
  @Input() boardId?: number;
  titleInput = '';

  constructor(private listsService: ListsService, private boardsService: BoardsService, private toastr: ToastrService){}

  createNewList() {
    this.boardId && this.listsService.createList({name: this.titleInput, boardId: this.boardId}).pipe(
      switchMap(() => this.boardsService.getBoard(this.boardId!)),
      finalize(() => this.changeMode())
    ).subscribe({
      next: response => {
        this.boardsService.setBoard(response);
        this.toastr.success(`The list ${this.titleInput} has been created`);
      }
    });
  }

  changeMode(){
    this.changeEditMode.emit();
  }
}