import { Component, OnInit } from '@angular/core';
import { Conocimientos, CvService } from 'src/app/services/CV/cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

data:any;
links:any;
con:any;
trayprof:any;
trayesc:any;
listGraphs:any;
listTipoGraph=[
  {'name':'Bar Charts', 'component':'app-bar-chart','id':2},
  {'name':'Pie Charts', 'component':'app-pie-chart','id':3},
]
graph_id:any = {text: "example"};
  constructor(
    private cvSV:CvService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getTrayProf();
    this.getTrayEsc();
    this.getListGraphs();
  }
  getData(){
    this.cvSV.getListInfos().subscribe((res)=>{
      this.data=res[0];
    })
    this.cvSV.getListLinks().subscribe((res)=>{
      this.links=res;
    })
  }
getTrayProf(){
  this.cvSV.getListTrayectoriasNOEducativas().subscribe((res)=>{
    this.trayprof=res;
  })
}

getTrayEsc(){
  this.cvSV.getListTrayectoriasEducativas().subscribe((res)=>{
    this.trayesc=res;
  })
}

getListGraphs(){
  this.cvSV.getListGraficos().subscribe((res)=>{
    this.listGraphs=res;
  })
}

}
