import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityComponent } from './components/activity/activity.component';

@NgModule({
  declarations: [
    HistoryComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HistoryComponent,
    ActivityComponent
  ]
})
export class HistoryModule { }
