import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {
  @Input() options: any[] = [];
  @Input() label = '';
  @Output() chooseOption = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  choose(option: string){
    this.chooseOption.emit(option);
  }
}
