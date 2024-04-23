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
  @Output() moveTo = new EventEmitter();
  selectedOption: string = '';
  options = ['Planed', 'In progress', 'Closed'];
  bsModalRef: BsModalRef<EditModalComponent> = new BsModalRef<EditModalComponent>();
  bsOpenedCardModalRef: BsModalRef<OpenedCardModalComponent> = new BsModalRef<OpenedCardModalComponent>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  move(moveTo: string){
    this.moveTo.emit(moveTo);
  }

  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Do thing',
          'Another thing',
          'Something else'
        ],
        title: 'Test modal'
      }
    }
    this.bsModalRef = this.modalService.show(EditModalComponent, initialState);
  }

  openCardModal(){
    this.bsOpenedCardModalRef = this.modalService.show(OpenedCardModalComponent);
  }
}
