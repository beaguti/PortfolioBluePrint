import { Component, OnInit } from '@angular/core';
import { CvService, Info, Link, Trayectoria } from 'src/app/services/CV/cv.service';
import { FileUploadService } from 'src/app/services/files/file-upload.service';

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.scss']
})
export class EditCVComponent implements OnInit{
  //view
info= new Info();
listLinks:Link[]=[];
listProf:Trayectoria[]=[];
listEsc:Trayectoria[]=[];
listConocimientos:any[]=[];
listGraph:any[]=[];
listTipoGraph:any=[]=[];

color: any = '';

//create
linkName="";
linkIcon="";
linkLink="";
ProfTitulo="";
ProfDescripcion="";
ProfSubtitutlo="";
ProfCentro="";
ProfFechaEntrada="";
ProfFechaSalida="";
profNewTecnologia="";
ProfTecnologias:any=[];
EscTitulo="";
EscDescripcion="";
EscSubtitutlo="";
EscCentro="";
EscFechaEntrada="";
EscFechaSalida="";
escNewTecnologia="";
EscTecnologias:any=[];
ConocLabel="";
ConocData=0;
ConocGraphId="";
GraphTitle="";
selectedGraphType="";
imgFile=null;
pdfFile=null;
ConocColor="";

//show
infoEdit=false;
infoShow=true;
trayPEdit=false;
trayPNew=false;
trayPShow=true;
linkShow=true;
linkEdit=false;
profShow=true;
profEdit=false;
showProfTec=false;
editProfTec=false;
escShow=true;
escEdit=false;
showEscTec=false;
editEscTec=false;
conShow=true;
conEdit=false;
graphShow=true;
graphEdit=false;


//img uploader
upload(ev:any){
  this.imgFile=ev.files[0];
}
uploadPDF(ev:any){
  this.pdfFile=ev.files[0];
}
  constructor(
    private cvSV:CvService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.getListLinks();
    this.getListTrayEsc();
    this.getListTrayProf();
    this.getTypesGraph();
  }



  //CV
  getTypesGraph(){
    this.listTipoGraph=[
      {'name':'Bar Charts', 'component':'app-bar-chart','id':2},
      {'name':'Pie Charts', 'component':'app-pie-chart','id':3},
    ]
    this.getListGraph();
    }
  //info methods
  editarinfo(){
    this.infoShow=false;
    this.infoEdit=true;
  }
  getInfo(){
    debugger;
    this.cvSV.getListInfos().subscribe((res)=>{
      debugger;
      this.info=res[0];
    })
  }
  saveInfo(){
    //mirar uploadear archivos
    this.cvSV.editInfo(this.info.id,this.info.nombre,this.info.descripcion,this.info.subtitulo)
    this.fileUploadService.upload(this.imgFile,'jpg','cv',this.info.id)
    this.fileUploadService.upload(this.pdfFile,'pdf','cv',this.info.id)
    this.infoShow=true;
    this.infoEdit=false;
  }
  
  //links
  getListLinks(){
    this.cvSV.getListLinks().subscribe((res)=>{
      this.listLinks=res;
    })
  }
  editLink(){
    this.linkShow=false;
    this.linkEdit=true;
  }
  saveLink(item:any){
    this.cvSV.editLink(item.id,item.icon,item.nombre,item.link);
    this.linkShow=true;
    this.linkEdit=false;
  }
  
  newLink(){
    this.cvSV.createLink(this.linkLink,this.linkName,this.linkIcon);
    this.linkLink="";
    this.linkName="";
    this.linkIcon="";
  }
  
  deleteLink(id:string){
    this.cvSV.deleteLink(id);
    this.getListLinks();
  }
  
  
  //trayectProf
  getListTrayProf(){
    this.cvSV.getListTrayectoriasNOEducativas().subscribe(res=>{
      this.listProf=res;
    })
  }
  saveProf(item:any){
    this.cvSV.editTrayectoria(item.id,item.titulo,item.descripcion,item.subtitulo,item.centro,item.fechaEntrada,item.fechaSalida,false,item.tecnologias);
  
  }
  
  guardarprof(){
    this.profShow=true;
    this.profEdit=false;
    this.showProfTec=false;
  }
  newProf(){
    this.cvSV.createTrayectoria(this.ProfDescripcion,this.ProfTitulo,this.ProfSubtitutlo,this.ProfCentro,this.ProfFechaEntrada,this.ProfFechaSalida,false,this.ProfTecnologias);
    this.ProfDescripcion="";
    this.ProfTitulo="";
    this.ProfSubtitutlo="";
    this.ProfCentro="";
    this.ProfFechaEntrada="";
    this.ProfFechaSalida="";
    this.ProfTecnologias=[];
  }
  
  deleteProf(id:string){
    this.cvSV.deleteTrayectoria(id);
  }
  
  editprof(){
    this.profShow=false;
    this.profEdit=true;
    this.showProfTec=true;
  }
  addShowproftec(){
    this.showProfTec=false;
    this.editProfTec=true;
  }
  
  addproftec(){
    this.ProfTecnologias.push(this.profNewTecnologia);
  }
  deletefromProfTecnologias(key:any){
    const index = this.ProfTecnologias.indexOf(key, 0);
    if (index > -1) {
      this.ProfTecnologias.splice(index, 1);
    }
  }
  guardarnewproftec(item:any){
    item.tecnologias.push(this.profNewTecnologia);
    this.showProfTec=false;
    this.editProfTec=true;
    this.profNewTecnologia="";
  }
  
  borrarTecProf(item:any,key:any){
    const index = item.tecnologias.indexOf(key, 0);
    if (index > -1) {
      item.tecnologias.splice(index, 1);
    }
  }
  //trayectEsc
  getListTrayEsc(){
    this.cvSV.getListTrayectoriasEducativas().subscribe(res=>{
      this.listEsc=res;
    })
  }
  
  saveEsc(item:any){
    this.cvSV.editTrayectoria(item.id,item.titulo,item.descripcion,item.subtitulo,item.centro,item.fechaEntrada,item.fechaSalida,true,item.tecnologias);
  
  }
  guardaresc(){
    this.escShow=true;
    this.escEdit=false;
    this.showEscTec=false;
  }
  
  newEsc(){
    this.cvSV.createTrayectoria(this.EscDescripcion,this.EscTitulo,this.EscSubtitutlo,this.EscCentro,this.EscFechaEntrada,this.EscFechaSalida,true,this.EscTecnologias);
    this.EscDescripcion="";
    this.EscTitulo="";
    this.EscSubtitutlo="";
    this.EscCentro="";
    this.EscFechaEntrada="";
    this.EscFechaSalida="";
    this.EscTecnologias=[];
  }
  
  deleteEsc(id:string){
    this.cvSV.deleteTrayectoria(id);
  }
  
  editesc(){
    this.escShow=false;
    this.escEdit=true;
    this.showEscTec=true;
  }
  addShowesctec(){
    this.showEscTec=false;
    this.editEscTec=true;
  }
  
  addesctec(){
    this.EscTecnologias.push(this.escNewTecnologia);
  }
  deletefromEscTecnologias(key:any){
    const index = this.EscTecnologias.indexOf(key, 0);
    if (index > -1) {
      this.EscTecnologias.splice(index, 1);
    }
  }
  guardarnewesctec(item:any){
    item.tecnologias.push(this.escNewTecnologia);
    this.showEscTec=false;
    this.editEscTec=true;
    this.escNewTecnologia="";
  }
  
  borrarTecEsc(item:any,key:any){
    const index = item.tecnologias.indexOf(key, 0);
    if (index > -1) {
      item.tecnologias.splice(index, 1);
    }
  }
  
  //conocimietos
  getListConoc(){
    this.cvSV.getListConocimientoss().subscribe(res=>{
      this.listConocimientos=[];
      res.forEach((a:any,i:number) => {
        this.listGraph.forEach((element:any) => {
          if(a.graph_id==String(element['id']))
          this.listConocimientos.push({'label':a.label,'nameGraph':element['title'],'data':a.data,'graph_id':a.graph_id,'id':a.id,'color':a.color})
          else if(a.graph_id==='')
          this.listConocimientos.push({'label':a.label,'nameGraph':'','data':a.data,'graph_id':a.graph_id,'id':a.id,'color':a.color})
        });
      });
    })
  }

  changecolor(item:any, color: any) {
    console.log('color' + color);
    item = color;
  }
  
  saveConoc(item:any){
    //falla por que color es undefined, meter colorpicker
    this.cvSV.editConocimientos(item.id,item.label,item.graph_id,item.data,item.color);
    this.getListConoc();
  }
  
  newConoc(){
    this.cvSV.createConocimientos(this.ConocGraphId,this.ConocData,this.ConocLabel,this.ConocColor);
    this.ConocColor="";
    this.ConocGraphId="";
    this.ConocData=0;
    this.ConocLabel="";
  }
  
  deleteConoc(id:string){
    this.cvSV.deleteConocimientos(id);
  }
  
  editcon(){
    this.conShow=false;
    this.conEdit=true;
  }
  guardarcon(){
    this.conShow=true;
    this.conEdit=false;
  }
  //graph
  getListGraph(){
    this.cvSV.getListGraficos().subscribe(res=>{
      this.listGraph=[];
      res.forEach((a:any,i:number) => {
        this.listTipoGraph.forEach((element:any) => {
          if(a.tipo_grafico_id==String(element['id']))
          this.listGraph.push({'tipo_grafico':a.tipo_grafico_id,'nameGraph':element['name'],'title':a.title,'id':a.id})
          else if(a.tipo_grafico_id==='')
          this.listGraph.push({'tipo_grafico':a.tipo_grafico_id,'nameGraph':'','title':a.title,'id':a.id})
        });
      });
      this.getListConoc();
    })
  }
  
  newGraph(){
    this.cvSV.createGraficos(this.GraphTitle,this.selectedGraphType);
    this.GraphTitle="";
    this.selectedGraphType="";
  }
  
  deleteGraph(id:string){
    this.cvSV.deleteGraficos(id);
  }
  saveGraph(item:any){
    this.cvSV.editGraficos(item.title,String(item.tipo_grafico_id),item.id);
  }
  editgraph(){
    this.graphShow=false;
    this.graphEdit=true;
  }
  guardargraph(){
    this.graphShow=true;
    this.graphEdit=false;
  }
}
