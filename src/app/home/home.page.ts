import { Component } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { BeaconService } from '../services/beacon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  kontaktDevices: any[] = [];

  constructor(private BeaconService: BeaconService) {

    this.getDatos();
  }

  scanDevices() {
    this.BeaconService.scanDevices();


  }

  getDatos = () => {
  setTimeout(() => {
    this.kontaktDevices=this.BeaconService.getDevices();
    console.log("aaaaaaa");

  },5000);
  }
}



