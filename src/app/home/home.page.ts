import { Component } from '@angular/core';
import { BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';

const HEART_RATE_SERVICE = numberToUUID(0x180d);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {



  constructor() {

    this.scan();
    console.log("potato");

  }



 async scan(): Promise<void> {
    try {
      await BleClient.initialize();

      await BleClient.requestLEScan(
        {
          services: [HEART_RATE_SERVICE],
        },
        result => {
          console.log('received new scan result', result);
        },
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }



}



