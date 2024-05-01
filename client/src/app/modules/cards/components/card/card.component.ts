import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CardsService } from '../../services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { EditCardComponent } from 'src/app/modules/modals/components/edit-card/edit-card.component';
import { OpenCardComponent } from 'src/app/modules/modals/components/open-card/open-card.component';
import { ListsWithIds } from 'src/app/modules/lists/models/list';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id?: number; // card id
  @Input() name?: string;
  @Input() description?: string;
  @Input() dueDate?: string;
  @Input() priority?: string;
  @Input() list?: string; // list name
  @Input() listId?: number; // list id
  @Input() lists: ListsWithIds[] = [];
  priorities = ['Low', 'Medium', 'High'];
  bsModalRef: BsModalRef<EditCardComponent | OpenCardComponent> = new BsModalRef<EditCardComponent | OpenCardComponent>();

  constructor(private cardsService: CardsService, private modalService: BsModalService, private toastr: ToastrService){}

  moveTo(move: number){
    this.cardsService.editCard(this.id!, {listId: move}).subscribe({
      next: () => {
        this.toastr.success('List has been edited');
      },
      error: (error) => {
        this.toastr.error("Something unexpected went wrong: " + error);
      }
    })
  }

  deleteCard(id: number){
    if (this.id){
      this.cardsService.deleteCard(id).subscribe({
        next: () => {
          this.toastr.success('Card has been deleted');
        }
      })
    }
  }

  openEditModal(){
    const initialState: ModalOptions = {
      initialState: {
        cardId: this.id,
        cardName: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        listName: this.list,
        listId: this.listId,
        lists: this.lists,
        priorities: this.priorities
      }
    }
    this.bsModalRef = this.modalService.show(EditCardComponent, initialState);
  }

  openCardModal(){
    const initialState: ModalOptions = {
      initialState: {
        id: this.id,
        name: this.name,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        list: this.list,
        listId: this.listId,
        lists: this.lists,
        priorities: this.priorities
      },
      class: 'modal-lg'
    }
    this.bsModalRef = this.modalService.show(OpenCardComponent, initialState);
  }
}
