import { Component } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { interval } from 'rxjs';
import { BeaconService } from '../services/beacon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  kontaktDevices: any[] = [];

  constructor(private BeaconService: BeaconService) {

    interval(1000).subscribe((x) => {
      this.getDatos();
    });


  }

  scanDevices() {
    this.BeaconService.scanDevices();


  }

  getDatos = () => {
  setTimeout(() => {
    this.kontaktDevices=this.BeaconService.getDevices();
    console.log(this.kontaktDevices);


  },8000);
  }

  viewItem(item) {

  console.log(item);
  console.log(item[1].rssi);
  console.log(item[0].rssi);

  }




}



