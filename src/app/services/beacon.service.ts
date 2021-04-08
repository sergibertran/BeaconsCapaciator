import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { argv } from 'process';
@Injectable({
  providedIn: 'root',
})
export class BeaconService {
  kontaktDevices: any[] = [];

  constructor() {}
  rssis: any[] = [];
  meters: number;
  devices = new Map<String, Object>();
  modifDevice;
  last_seen;
  avg = 0;

  scanDevices() {
    this.scan();
  }

  getDevices() {
    this.sort();
    return this.kontaktDevices;
  }
  sort() {
    this.kontaktDevices.sort((n1, n2) => {
      if (n1[1].rssi < n2[1].rssi) {
        return 1;
      }

      if (n1[1].rssi > n2[1].rssi) {
        return -1;
      }

      return 0;
    });
  }

  async scan(): Promise<void> {
    try {
      await BleClient.initialize();

      await BleClient.requestLEScan({ name: 'Kontakt' }, (device) => {
        this.meters = Math.round(Math.pow(10, (-69 - device.rssi) / (10 * 2)));
        this.modifDevice = device;
        this.modifDevice.meters = this.meters;
        this.last_seen = Date.now();
        this.modifDevice.last_seen = this.last_seen;
        this.modifDevice.rssis = [];
        const id = this.modifDevice.device.deviceId;

        if (this.devices.has(id)) {
          const devices = this.devices.get(id);
          this.modifDevice.rssis = devices['rssis'];

          this.devices.delete(id);
        }
        this.setDistance();
        this.setUbicationInfo();
        this.modifDevice.rssis.push(device.rssi);

        this.devices.set(id, this.modifDevice);
        this.kontaktDevices = Array.from(this.devices);
      });

      setTimeout(async () => {
        await BleClient.stopLEScan();
        const values = this.devices.values();
        for (let value of values) {
          const milis = Date.now() - value['last_seen'];

          if (milis / 1000 > 30) {
          }
        }
        console.log('stopped scanning');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  setDistance() {  // ubi last rssi
    const rssis = this.modifDevice.rssis;

    if (rssis.length > 1) {
      if (rssis[rssis.length - 1] > rssis[rssis.length - 2]) {
        this.modifDevice.estado = 'getting closer';
        if (rssis[rssis.length - 1] - rssis[rssis.length - 2] < 5) {
          this.modifDevice.estado = 'static';
        }
      } else if (rssis[rssis.length - 1] < rssis[rssis.length - 2]) {
        this.modifDevice.estado = 'walking away';

        if (rssis[rssis.length - 1] - rssis[rssis.length - 2] > -5) {
          this.modifDevice.estado = 'static';
        }
      } else {
        this.modifDevice.estado = 'static';
      }
    }
  }

  setUbicationInfo() {   //avg 3 ultimos rssi
    const id = this.modifDevice.device.deviceId;
    const rssis = this.modifDevice.rssis;
    const sum = 0;
    const rssisLength = rssis.length-1;


    if (id == 'F5:0F:CA:33:DF:A0') {
      if (rssis.length >= 4) {
        for (let index = rssis.length - 4; index < rssisLength; index++) {
          this.avg = this.avg + rssis[index];
          console.log(rssis[index]);

        }
        this.avg = this.avg / 3;
        console.log(this.avg);

        console.log(rssis[rssisLength]);
        if(rssis[rssisLength]>this.avg+5){
          this.modifDevice.avg=this.avg+"mes aprop"

        }else if (rssis[rssisLength]<this.avg-5){
          this.modifDevice.avg=this.avg+"mes lluny"

        }else{
          this.modifDevice.avg=this.avg+"igual"
        }

        this.avg = 0;
      }
    }
  }
}
