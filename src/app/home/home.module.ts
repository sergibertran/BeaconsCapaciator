import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomePageRoutingModule } from './home-routing.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    HomePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
