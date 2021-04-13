import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartDataSets,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { Color, BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  device;
  datos;
  nArray = [];
  devicesMeters = [];
  allDevices = [];
  lineChartData: ChartDataSets[] = [{ data: [], label: 'Series A' }];
  lineChartLabels: Label[] = [];

  // PolarArea

  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() {}

  ngOnInit() {
    this.device;
    for (let index = 0; index < this.device[1].rssis.length; index++) {
      this.devicesMeters.push(
        Math.round(Math.pow(10, (-69 - this.device[1].rssis[index]) / (10 * 2)))
      );
    }

    this.polarAreaChartData = this.devicesMeters;
    this.lineChartData = [{ data: this.devicesMeters, label: this.device[0] }];

    for (let index = 0; index < this.device[1].rssis.length; index++) {
      this.nArray.push(index);
    }
    this.lineChartLabels = this.nArray;
    this.datos = true;
  }

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  segmentChanged(ev: any) {
    console.log(ev.detail);
    console.log(typeof ev.detail);

    if (ev.detail.value == 'meters') {
      console.log('meters');

      for (let index = 0; index < this.device[1].rssis.length; index++) {
        this.devicesMeters.push(
          Math.round(
            Math.pow(10, (-69 - this.device[1].rssis[index]) / (10 * 2))
          )
        );
      }
      this.lineChartData = [
        { data: this.devicesMeters, label: this.device[0] },
      ];
    } else if (ev.detail.value == 'rssi') {
      this.lineChartData = [
        { data: this.device[1].rssis, label: this.device[0] },
      ];
      console.log('rssi');
    }
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
