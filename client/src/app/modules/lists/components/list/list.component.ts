import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditModalComponent } from 'src/app/shared/modals/edit-modal/edit-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list?: string;
  @Input() count?: number;

  // @Input() cards: Card[] = [];
  // @Input() count?: number;
  // @Input() name?: string;

  addNewListMode = false;
  editListMode = false;

  bsModalRef: BsModalRef<EditModalComponent> = new BsModalRef<EditModalComponent>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        function: 'Add new card'
      }
    }
    this.bsModalRef = this.modalService.show(EditModalComponent, initialState);
  }

  moveTo(moveTo: string){
    console.log(moveTo);
  }

  changeMode(){
    this.addNewListMode = !this.addNewListMode;
  }

  changeEditMode(){
    this.editListMode = !this.editListMode;
  }
}
