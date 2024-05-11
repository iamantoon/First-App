import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../core/store/reducers/board.reducer';
import { BoardEffects } from '../core/store/effects/board.effects';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    StoreModule.forFeature("board", boardReducer),
    EffectsModule.forFeature([BoardEffects])
  ],
  exports: [
    CardComponent
  ]
})
export class CardsModule { }
