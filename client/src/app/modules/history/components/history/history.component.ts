import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Output() hideHistory = new EventEmitter();
  @Input() boardId?: number;
  pageSize: number = 20;
  totalCount?: number;
  loggedActivity: Activity[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    if (this.boardId) this.getLoggedActivity(this.boardId, this.pageSize);
  }

  getLoggedActivity(boardId: number, pageSize: number){
    this.historyService.getLoggedActivity(boardId, pageSize).subscribe({
      next: (value) => {
        this.loggedActivity = value.activities;
        this.totalCount = value.totalCount;
        this.pageSize = value.pageSize;
      } 
    })
  }

  showMore(){
    const pageSizeIncrements = [20, 40, 60, 80, 100, 120, 140, 160];
    const currentIndex = pageSizeIncrements.indexOf(this.pageSize);
    if (currentIndex !== -1 && currentIndex < pageSizeIncrements.length - 1) {
      const nextPageSize = pageSizeIncrements[currentIndex + 1];
      if (this.boardId) this.getLoggedActivity(this.boardId, nextPageSize);
      this.pageSize = nextPageSize;
    }
  }

  hide(){
    this.hideHistory.emit(false);
  }
}
