import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from 'service/modal.service';
import { PanelService } from 'service/panel.service';

@Component({
  selector: 'cut-in-view',
  templateUrl: './cut-in-view.component.html',
  styleUrls: ['./cut-in-view.component.css']
})
export class CutInViewComponent implements OnInit {

  @Input() title: string = '';
  @Input() imageUrl: string = '';
  constructor(
    private panelService: PanelService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.panelService.title = this.title;
    if (this.modalService.option && this.modalService.option.title != null) {
      this.modalService.title = this.modalService.option.title ? this.modalService.option.title : '';
      this.imageUrl = this.modalService.option.imageUrl ? this.modalService.option.imageUrl : '';
    }
  }

}
