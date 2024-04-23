import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListsComponent } from './components/lists/lists.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 

@NgModule({
  declarations: [
    ListComponent,
    ListsComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
