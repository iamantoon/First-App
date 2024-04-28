import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Card } from 'src/app/modules/cards/models/card';
import { EditModalComponent } from 'src/app/shared/modals/edit-modal/edit-modal.component';
import { ListsService } from '../../services/lists.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() lists: string[] = [];
  @Input() priorities: string[] = [];
  @Input() id?: number; // for editing and deleting
  editListMode = false;
  bsModalRef: BsModalRef<EditModalComponent> = new BsModalRef<EditModalComponent>();

  constructor(private listsService: ListsService, private modalService: BsModalService, private toastr: ToastrService) {}

  deleteList(id: number){
    this.listsService.deleteList(id).subscribe({
      next: () => {
        this.toastr.success("List has been deleted successfully");
      }
    })
  }

  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        lists: this.lists,
        priorities: this.priorities
      }
    }
    this.bsModalRef = this.modalService.show(EditModalComponent, initialState);
  }

  changeEditMode(){
    this.editListMode = !this.editListMode;
  }
}
