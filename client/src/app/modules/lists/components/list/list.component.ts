import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/modules/cards/models/card';
import { AddCardComponent } from 'src/app/modules/modals/components/add-card/add-card.component';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';
import { ListsWithIds } from '../../models/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list?: string;
  @Input() count?: number;
  @Input() cards: Card[] = [];
  @Input() name?: string;
  @Input() lists: ListsWithIds[] = [];
  @Input() priorities: string[] = [];
  @Input() id?: number; // list id
  editListMode = false;
  bsModalRef: BsModalRef<AddCardComponent> = new BsModalRef<AddCardComponent>();

  constructor(private listsService: ListsService, private modalService: BsModalService, private toastr: ToastrService) {}

  deleteList(id: number){
    this.listsService.deleteList(id).subscribe({
      next: () => {
        this.toastr.success("List has been deleted successfully");
      }
    })
  }

  openCreateCardModal(){
    const initialState: ModalOptions = {
      initialState: {
        lists: this.lists,
        priorities: this.priorities,
        listId: this.id,
        listName: this.list
      }
    }
    this.bsModalRef = this.modalService.show(AddCardComponent, initialState);
  }

  changeEditMode(){
    this.editListMode = !this.editListMode;
  }
}
