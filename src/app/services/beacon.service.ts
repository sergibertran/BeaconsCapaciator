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
  devicesDictionary = new Map<String, Object>();
  devices10Dictionary = new Map<String, []>();
  resultado;
  last_seen;
  scanDevices() {
    this.scan();
  }

  getDevices() {
    this.sortMethod();
    return this.kontaktDevices;
  }

  sortMethod() {
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

      await BleClient.requestLEScan({ name: 'Kontakt' }, (result) => {

        this.meters = Math.round(Math.pow(10, (-69 - result.rssi) / (10 * 2)));
        this.resultado=result;
        this.resultado.meters=this.meters;
        this.last_seen = Date.now();
        this.resultado.last_seen= this.last_seen;
        this.resultado.arrayRssi= this.last_seen;

        if (this.devicesDictionary.has(this.resultado.device.deviceId) == true) {
          this.devicesDictionary.delete(this.resultado.device.deviceId);
          console.log("se repite y se borra");

        }




        this.devicesDictionary.set(this.resultado.device.deviceId, this.resultado);
        this.kontaktDevices = Array.from(this.devicesDictionary);
      });


      setTimeout(async () => {
        await BleClient.stopLEScan();


        for (let value of this.devicesDictionary.values()) {

          console.log((Date.now()-value['last_seen'])/1000>30);

          if((Date.now()-value['last_seen'])/1000>30){

            console.log("El beacon amb "+value['id']+" fa "+(Date.now()-value['last_seen'])/1000>30+" que no es troba");
            console.log(this.devicesDictionary.has(value['id']));

          }

        }
        console.log('stopped scanning');

      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
}
