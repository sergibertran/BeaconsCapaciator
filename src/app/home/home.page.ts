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
  Devices: any[] = [];

  constructor(private beaconService: BeaconService) {
    const scanTime = 4000;
    interval(scanTime).subscribe((x) => {
      console.log('scan');

      this.scanDevices();
    });
    const getDataTime = 1000;
    interval(getDataTime).subscribe((x) => {
      this.getData();
    });
  }

  scanDevices() {
    this.beaconService.scanDevices();
  }

  getData = () => {
    setTimeout(() => {
      this.Devices = this.beaconService.getDevices();
    }, 8000);
  };

  viewItem(item) {
    const infoDevice = item[1]['localName'] + item[0];

    alert(infoDevice);
  }
}
