import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
@Injectable({
  providedIn: 'root',
})
export class BeaconService {
  kontaktDevices: any[] = [];
  newkontaktDevices: any[] = [];
  constructor() {}
  rssis: any[] = [];
  meters: number;
  devicesDictionary = new Map<String, Object>();
  devices10Dictionary = new Map<String, any[]>();
  resultado;
  last_seen;
  scanDevices() {
    this.scan();
  }

  getDevices() {
    this.sortMethod();
    return this.kontaktDevices;
  }

  getNewDic() {
    return this.newkontaktDevices;
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
        this.resultado = result;
        this.resultado.meters = this.meters;
        this.last_seen = Date.now();
        this.resultado.last_seen = this.last_seen;

        if (
          this.devicesDictionary.has(this.resultado.device.deviceId) == true
        ) {
          this.devicesDictionary.delete(this.resultado.device.deviceId);
          console.log('se repite y se borra');
        }

        if (
          this.devices10Dictionary.has(this.resultado.device.deviceId) == true
        ) {
          this.rssis = [];
          this.rssis = this.devices10Dictionary.get(
            this.resultado.device.deviceId
          );
          console.log(
            this.devices10Dictionary.get(this.resultado.device.deviceId)
          );
          console.log(result.rssi);

          this.rssis.push(result.rssi);
          this.devices10Dictionary.set(
            this.resultado.device.deviceId,
            this.rssis
          );
          this.newkontaktDevices = Array.from(this.devices10Dictionary);
        } else {
          this.rssis = [];
          this.rssis.push(result.rssi);
          this.devices10Dictionary.set(
            this.resultado.device.deviceId,
            this.rssis
          );
          this.newkontaktDevices = Array.from(this.devices10Dictionary);
        }
        this.state();

        this.devicesDictionary.set(
          this.resultado.device.deviceId,
          this.resultado
        );

        this.kontaktDevices = Array.from(this.devicesDictionary);
      });

      setTimeout(async () => {
        await BleClient.stopLEScan();

        for (let value of this.devicesDictionary.values()) {
          if ((Date.now() - value['last_seen']) / 1000 > 30) {
            console.log(this.devicesDictionary.has(value['id']));
          }
        }
        console.log('stopped scanning');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  state(){
    if (this.rssis.length > 1) {
      console.log(this.rssis.length);
      console.log(this.rssis);

      console.log(
        this.rssis[this.rssis.length - 1] +
          this.rssis[this.rssis.length - 2]
      );

      if (
        this.rssis[this.rssis.length - 1] >
        this.rssis[this.rssis.length - 2]
      ) {
        this.resultado.estado = 'getting closer';
        if (
          this.rssis[this.rssis.length - 1] -
            this.rssis[this.rssis.length - 2] >
          5
        ) {
          this.resultado.estado = 'static';
        }
      } else if (
        this.rssis[this.rssis.length - 1] <
        this.rssis[this.rssis.length - 2]
      ) {
        this.resultado.estado = 'walking away';

        if (
          this.rssis[this.rssis.length - 1] -
            this.rssis[this.rssis.length - 2] >
          -5
        ) {
          this.resultado.estado = 'static';
        }
      } else {
        this.resultado.estado = 'static';
      }
    }

  }




}
