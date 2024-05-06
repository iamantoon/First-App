import { Component, Input, OnInit } from '@angular/core';
import { FormatDateService } from 'src/app/modules/modals/services/format-date.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() cardName: string = '';
  @Input() activityName: string = '';
  @Input() previousValue: string = '';
  @Input() updatedValue: string = '';
  @Input() date: Date = new Date();
  @Input() listName?: string = '';

  constructor(public formatDateService: FormatDateService){}
}
