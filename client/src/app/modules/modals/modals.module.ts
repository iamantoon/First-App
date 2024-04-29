import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardComponent } from './components/add-card/add-card.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { OpenCardComponent } from './components/open-card/open-card.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AddCardComponent,
    EditCardComponent,
    OpenCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule,
    ModalModule
  ],
  exports: [
    AddCardComponent,
    EditCardComponent,
    OpenCardComponent
  ]
})
export class ModalsModule { }
