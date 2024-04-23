import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-opened-card-modal',
  templateUrl: './opened-card-modal.component.html',
  styleUrls: ['./opened-card-modal.component.css']
})
export class OpenedCardModalComponent implements OnInit {
  title = '';
  list: any;
  closeBtnName = '';

  constructor(private bsOpenedCardModalRef: BsModalRef) { }

  ngOnInit(): void {}

}
