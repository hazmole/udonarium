import { Component, OnDestroy, OnInit } from '@angular/core';

import { PeerContext } from '@udonarium/core/system/network/peer-context';
import { EventSystem, Network } from '@udonarium/core/system';
import { PeerCursor } from '@udonarium/peer-cursor';

import { ModalService } from 'service/modal.service';
import { PanelService } from 'service/panel.service';

@Component({
  selector: 'room-setting',
  templateUrl: './room-setting.component.html',
  styleUrls: ['./room-setting.component.css']
})
export class RoomSettingComponent implements OnInit, OnDestroy {
  peers: PeerContext[] = [];
  isReloading: boolean = false;

  roomName: string = '普通的房間';
  password: string = '';
  isPrivate: boolean = false;
  allowWatch: boolean = true;

  get peerId(): string { return Network.peerId; }
  get isConnected(): boolean { return Network.peerIds.length <= 1 ? false : true; }
  validateLength: boolean = false;

  constructor(
    private panelService: PanelService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalService.title = this.panelService.title = '創建房間'
    EventSystem.register(this);
    this.calcPeerId(this.roomName, this.password);
  }

  ngOnDestroy() {
    EventSystem.unregister(this);
  }

  calcPeerId(roomName: string, password: string) {
    let peerId = Network.peerContext ? Network.peerContext.id : PeerContext.generateId();
    let context = PeerContext.create(peerId, PeerContext.generateId('***'), roomName, password);
    this.validateLength = context.fullstring.length < 64 ? true : false;
  }

  createRoom() {
    let peerId = Network.peerContext ? Network.peerContext.id : PeerContext.generateId();
    Network.open(peerId, PeerContext.generateId('***'), this.roomName, this.password, this.allowWatch);
    PeerCursor.myCursor.peerId = Network.peerId;

    this.modalService.resolve();
  }
}