import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isHistoryVisible = false;

  toggleHistory(){
    this.isHistoryVisible = !this.isHistoryVisible;
  }
}
