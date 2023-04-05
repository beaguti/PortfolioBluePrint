import { Component, Input } from '@angular/core';
import { CvService } from 'src/app/services/CV/cv.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  //leyenda
  leyenda:any=[];
//plotly
values:any=[];
texto:any=[];
colors:any=[];
label:any=[];

data = [{
  values: this.values,
  labels: this.label,
  type: 'pie',
  marker:{
    colors:this.colors
  }
}];
layout:any = {
  title: "",
  height: 400,
  width: 500,
  showlegend: false
};
config:any= { displaylogo: false };
degrees = 115;
radius = .6;
radians = this.degrees * Math.PI / 180;
x = -1 * this.radius * Math.cos(this.radians);
y = this.radius * Math.sin(this.radians);

@Input() graph_id:any;
  constructor(
    private cvSV:CvService
  ) { }
  ngOnInit(): void {
    this.getData();
  }
  async getData(){
      this.cvSV.getListConocimientossByGraph(this.graph_id).subscribe((res)=>{
        res.forEach((element: any) => {
          this.leyenda.push({'text':element.label,'color':element.color})
          this.values.push(element.data);
          this.colors.push(element.color);
          this.label.push(element.label);
         
   
       });
    })
  }

}
