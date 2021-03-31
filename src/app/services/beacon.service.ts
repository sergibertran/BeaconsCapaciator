import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
@Injectable({
  providedIn: 'root',
})
export class BeaconService {
  kontaktDevices: any[] = [];
  constructor() {}
  array;
  meters: number;

  scanDevices() {
    this.scan();
  }

  getDevices() {
    this.sortMethod();
    return this.kontaktDevices;
  }

  sortMethod() {
    this.kontaktDevices.sort((n1, n2) => {
      if (n1.rssi < n2.rssi) {
        return 1;
      }

      if (n1.rssi > n2.rssi) {
        return -1;
      }

      return 0;
    });
  }

  async scan(): Promise<void> {
    try {
      await BleClient.initialize();

      await BleClient.requestLEScan({ name: 'Kontakt' }, (result) => {

        this.meters = Math.round(Math.pow(10, (-69 - result.rssi) / (10 * 2)));
        result.device.meters = this.meters;
        this.kontaktDevices.push(result);
        console.log(result);
      });

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }
}
