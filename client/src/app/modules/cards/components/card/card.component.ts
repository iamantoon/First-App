import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditModalComponent } from 'src/app/shared/modals/edit-modal/edit-modal.component';
import { OpenedCardModalComponent } from 'src/app/shared/modals/opened-card-modal/opened-card-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() name?: string;
  @Input() description?: string;
  @Input() dueDate?: string;
  @Input() priority?: 'Low' | 'Medium' | 'High';
  @Input() list?: string;
  @Input() lists: any[] = [];
  @Input() priorities: any[] = [];

  @Output() moveTo = new EventEmitter();
  selectedOption: string = '';
  options = ['Planed', 'In progress', 'Closed'];
  bsModalRef: BsModalRef<EditModalComponent | OpenedCardModalComponent> = new BsModalRef<EditModalComponent | OpenedCardModalComponent>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  move(moveTo: string){
    this.moveTo.emit(moveTo);
  }

  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        name: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        list: this.list,
        lists: this.lists,
        priorities: this.priorities
      }
    }
    this.bsModalRef = this.modalService.show(EditModalComponent, initialState);
  }

  openCardModal(){
    const initialState: ModalOptions = {
      initialState: {
        name: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        list: this.list
      }
    }
    this.bsModalRef = this.modalService.show(OpenedCardModalComponent, initialState);
  }
}
