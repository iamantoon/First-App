import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BoardComponent } from './components/board/board.component';
import { ListsModule } from '../lists/lists.module';
import { HistoryModule } from '../history/history.module';
import { FormsModule } from '@angular/forms';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { boardsReducer } from '../core/store/reducers/boards.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from '../core/store/effects/boards.effects';
import { boardReducer } from '../core/store/reducers/board.reducer';
import { BoardEffects } from '../core/store/effects/board.effects';

@NgModule({
  declarations: [
    BoardComponent,
    BoardsComponent,
    BoardItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListsModule,
    HistoryModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature("boardNames", boardsReducer),
    StoreModule.forFeature("board", boardReducer),
    EffectsModule.forFeature([BoardsEffects, BoardEffects])
  ],
  exports: [
    BoardComponent,
    BoardsComponent
  ]
})
export class BoardsModule { }
