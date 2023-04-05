import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';
import { PieChartComponent } from 'src/app/graphs/pie-chart/pie-chart.component';
import { PlotlyModule } from 'angular-plotly.js';
import { BarChartComponent } from 'src/app/graphs/bar-chart/bar-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CvComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,

    //external imports
    PlotlyModule,
    FontAwesomeModule,
  ]
})
export class CvModule { }
