import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardComponent } from './components/add-card/add-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { OpenCardComponent } from './components/open-card/open-card.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HistoryModule } from '../history/history.module';
import { ListsModule } from '../lists/lists.module';

import { CreateBoardComponent } from './components/create-board/create-board.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';

@NgModule({
  declarations: [
    AddCardComponent,
    EditCardComponent,
    OpenCardComponent,
    EditBoardComponent,
    CreateBoardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule,
    ModalModule,
    HistoryModule,
    ListsModule
  ],
  exports: [
    AddCardComponent,
    EditCardComponent,
    OpenCardComponent
  ]
})
export class ModalsModule { }
