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

  }

  scan(){
    try {
       BleClient.initialize();
console.log("entra");

       BleClient.requestLEScan(
        {
          name: 'Kontakt',
        },
        result => {
          console.log('received new scan result', result);
        },
      );

    } catch (error) {
      console.error(error);
    }
  }

}



