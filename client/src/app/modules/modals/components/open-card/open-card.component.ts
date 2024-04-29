import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-open-card',
  templateUrl: './open-card.component.html',
  styleUrls: ['./open-card.component.css']
})
export class OpenCardComponent implements OnInit {
  name = '';
  description = '';
  dueDate = '';
  priority = '';
  list = '';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}
}
