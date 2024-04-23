import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list?: string;
  @Input() count?: number;

  constructor() { }

  ngOnInit(): void {}

  moveTo(moveTo: string){
    console.log(moveTo);
  }
}
