import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditModalComponent } from './modals/edit-modal/edit-modal.component';
import { OpenedCardModalComponent } from './modals/opened-card-modal/opened-card-modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DatePickerComponent,
    EditModalComponent,
    OpenedCardModalComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule.forRoot({
      type: 'timer'
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [
    BsDatepickerModule,
    DatePickerComponent,
    BsDropdownModule,
    EditModalComponent,
    OpenedCardModalComponent,
    CustomSelectComponent,
    NgxSpinnerModule,
    ToastrModule
  ]
})
export class SharedModule { }
