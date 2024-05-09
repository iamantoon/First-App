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
    RouterModule
  ],
  exports: [
    BoardComponent,
    BoardsComponent
  ]
})
export class BoardsModule { }
