import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss'],
})
export class GeneralModalComponent implements OnInit {
  Devices;
  labelId = [];
  rssiLenght = [];
  datos = false;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.Devices);
    console.log(this.Devices.length);

    for (let index = 0; index < this.Devices.length; index++) {

      console.log(this.Devices[index][0]);
      console.log(this.Devices[index][1].rssis.length);

      this.labelId.push(this.Devices[index]);
      this.rssiLenght.push(this.Devices[index][1].rssis.length);
    }

    this.pieChartLabels = this.labelId;
    this.pieChartData = this.rssiLenght;
    console.log(this.labelId);
    console.log(this.rssiLenght);

    this.datos = true;
  }
}
