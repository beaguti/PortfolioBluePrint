import { Component, Input, OnInit } from '@angular/core';
import { CvService } from 'src/app/services/CV/cv.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit{
  //leyenda
  leyenda:any=[];
//plotly
x:any=[];
y:any=[];
c:any=[];
data:any=[
  {
    x: this.x,
    y: this.y,
    type: 'bar',
    marker:{
      color:this.c
    }
  },
];
layout = {
  title: "",
  barmode: "relative",
  showlegend: false,
  legend: { x: -0.1, y: -0.2, orientation: "h" },
  display: 'flex',
  xaxis: {
    automargin: true,
    autorange: true,
    showgrid: false,
    showline: true,
    zeroline: false
  },
  yaxis: {
    automargin: true,
    autorange: true,
    showgrid: true,
    showline: true,
    zeroline: false,
    ticksuffix: ""
  },
  margin: { t: 0, r: 0, b: 0, l: 50 },
  modeBarButtonsToAdd: []
};
config= {
  responsive: true,
  // toImageButtonOptions: {
  //   format: 'png',
  //   filename: 'ChartResults',
  //   height: 200,
  //   width: 600,
  //   scale: 1
  // },
  // modeBarButtonsToRemove: ['lasso2d', 'select2d'],
  // locale: this.cultureInfo,
  displaylogo: false};


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
            this.x.push(element.label);
            this.y.push(element.data);
            this.c.push(element.color)
      
          });
        })
    
  }

  generateplot(dat:any){
   
    //add vacio
    

  }
}
