import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Output() hideHistory = new EventEmitter();
  pageSize?: number;
  totalCount?: number;
  loggedActivity: Activity[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.getLoggedActivity();
  }

  getLoggedActivity(){
    this.historyService.getLoggedActivity().subscribe({
      next: (value) => {
        this.loggedActivity = value.activities;
        this.totalCount = value.totalCount;
        this.pageSize = value.pageSize;
      } 
    })
  }

  hide(){
    this.hideHistory.emit(false);
  }
}
