import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    DatePickerComponent,
    BsDropdownModule,
    NgxSpinnerModule,
    ToastrModule
  ]
})
export class SharedModule { }
