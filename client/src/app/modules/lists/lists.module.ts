import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListsComponent } from './components/lists/lists.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddListComponent } from './components/add-list/add-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../core/store/reducers/board.reducer';
import { BoardEffects } from '../core/store/effects/board.effects';

@NgModule({
  declarations: [
    ListComponent,
    ListsComponent,
    AddListComponent,
    EditListComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature("board", boardReducer),
    EffectsModule.forFeature([BoardEffects])
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
