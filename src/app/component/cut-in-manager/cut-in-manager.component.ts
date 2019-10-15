import { AfterViewInit, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';

import { ImageFile } from '@udonarium/core/file-storage/image-file';
import { ImageStorage } from '@udonarium/core/file-storage/image-storage';
import { ObjectStore } from '@udonarium/core/synchronize-object/object-store';
import { Network, EventSystem } from '@udonarium/core/system';
import { CutIn } from '@udonarium/cut-in';

import { CutInViewComponent } from 'component/cut-in-view/cut-in-view.component';
import { FileSelecterComponent } from 'component/file-selecter/file-selecter.component';
import { ModalService } from 'service/modal.service';
import { PanelOption, PanelService } from 'service/panel.service';

@Component({
  selector: 'cut-in-manager',
  templateUrl: './cut-in-manager.component.html',
  styleUrls: ['./cut-in-manager.component.css']
})
export class CutInManagerComponent implements OnInit, OnDestroy, AfterViewInit {

  selectedCutIn: CutIn = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
    private panelService: PanelService
  ) { }

  ngOnInit() {
    let arr: CutIn[] = ObjectStore.instance.getObjects(CutIn)
    this.panelService.title = 'Cut-in管理';
    this.selectedCutIn = (arr.length>0)? arr[0]: null;
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    //EventSystem.unregister(this);
  }


  selectCutIn(identifier: string) {
    //EventSystem.call('SELECT_CUT_IN', { identifier: identifier }, Network.peerId);
    this.selectedCutIn = ObjectStore.instance.get<CutIn>(identifier);
  }
  getCutIns(): CutIn[] {
    return ObjectStore.instance.getObjects(CutIn);
  }
  createCutIn() {
    let cut_in = new CutIn();
    cut_in.name = "空白Cut-in";
    cut_in.imageIdentifier = "null";
    cut_in.initialize();
  }

  openModal() {
    this.modalService.open<string>(FileSelecterComponent, { isAllowedEmpty: true }).then(value => {
      if (!value) return;
      //let file: ImageFile = ImageStorage.instance.get(value);
      console.log(value)
      this.selectedCutIn.imageIdentifier = value;
    });

  }
  displayCutIn() {
    if (this.selectedCutIn) {
      if(this.selectedCutIn.imageIdentifier!="null"){
        var img = new Image();
        var self = this;
        img.onload = function(){
            let option: PanelOption = { left: 200, top: 200, width: this["width"]+30, height: this["height"]+50 };
            let textView = self.panelService.open(CutInViewComponent, option);

            textView.title = self.selectedCutIn.name;
            textView.imageUrl = self.selectedCutIn.imageIdentifier;
            
        };
        img.src = this.selectedCutIn.imageIdentifier;
        
      }
      
    }
  }

  isSelectEmptyImage(): boolean { return this.selectedCutIn.imageIdentifier=="null"; }
  isWatchMode(): boolean { return Network.isSelfWatchMode(); }
}
