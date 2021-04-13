import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { interval } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { BeaconService } from '../services/beacon.service';
import { GeneralModalComponent } from '../general-modal/general-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Devices: any[] = [];
  filterTerm: string;
  constructor(private beaconService: BeaconService,public modalController: ModalController) {
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

  async presentModal(device) {
    console.log(device);

    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
        device: device

      }
    });
    return await modal.present();
  }

  async presentGeneralModal(Devices) {
    console.log(Devices);

    const modal = await this.modalController.create({
      component: GeneralModalComponent,
      componentProps:{
        Devices: Devices

      }
    });
    return await modal.present();
  }
}
