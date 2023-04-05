import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { FileUploadService } from 'src/app/services/files/file-upload.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit{
//view
listColabs:any[]=[];
listProjects:any[]=[];
//show
colabShow=true;
colabEdit=false;
projShow=true;
projEdit=false;
//create
colabName="";
colabUrl="";
colabImg:any;
projName="";
projDesc="";
projFecha="";
projLink="";
projCode="";
projImgUrl="";
projColab:any=[];

constructor(
  private projSV:ProjectService,
  private fileUploadService: FileUploadService,
  @Inject(LOCALE_ID) private locale: string, 
) { }

ngOnInit(): void {
  this.getlistColabs();
  this.getlistprojects();
}
//file manager
uploadProj(ev:any){
  this.projImgUrl=ev.files[0];
}
uploadColab(ev:any){
  this.colabImg=ev.files[0];
}
uploadProjItem(ev:any,item:any){
  item['imgUrl']=ev.files[0];
}
uploadColabItem(ev:any,item:any){
  item.imgUrl=ev.files[0];
}
//Projects
  //Colabs
  getlistColabs(){
    this.projSV.getListColabs().subscribe((res)=>{
      this.listColabs=res;
    })
  }

  saveColab(item:any){
    this.projSV.editColab(item.id,item.nombre,item.url);
    this.fileUploadService.upload(item.imgUrl,'jpg','projects/colabs',item.id);
  }

  newColab(){
    let id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    this.projSV.createColabWithID(id,this.colabName,this.colabUrl,"").finally(()=>{
      this.fileUploadService.upload(this.colabImg,'jpg','projects/colabs',id);
        this.colabName="";
        this.colabUrl="",
        this.colabImg="";
    });

  }

  deleteColab(id:any){
    this.projSV.deleteColab(id);
  }

  editcolab(){
    this.colabShow=false;
    this.colabEdit=true;
  }
  guardarcolab(){
    this.colabShow=true;
    this.colabEdit=false;
  }

//Proj
getlistprojects(){
  this.projSV.getListProjects().subscribe((res)=>{
    this.listProjects=[];
    res.forEach(element => {
      let a:any[]=[];
      this.projSV.getListProjectColabsByProject(element.id).subscribe((r)=>{
        r.forEach(async e => {
          a.push({'colab':await this.projSV.getColab(e.colab_id),'proj_colab_id':e.id})
        });
      })
      this.listProjects.push({'id':element.id,'nombre':element.nombre,'fecha':element.fecha,'descripcion':element.descripcion,'link':element.link,'code':element.code,'imgUrl':element.imgUrl,'listColab':a})
    });
  })
}
saveProj(item:any){
  //comprobar que la lista de colabs y la anterior no haya cambiado
  this.projSV.editProject(item.id,item.nombre,item.fecha,item.descripcion,item.link,item.code);
  this.fileUploadService.upload(item.imgUrl,'jpg','projects/proj',item.id);
}

newProj(){
  let id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
  this.projSV.createProjectWithID(id,this.projFecha,this.projDesc,this.projName,this.projLink,"",this.projColab,this.projCode).finally(()=>{
    this.fileUploadService.upload(this.projImgUrl,'jpg','projects/proj',id);
    this.projFecha="";
    this.projDesc="";
    this.projName="";
    this.projLink="";
    this.projColab=[];
    this.getlistprojects();
  });
  
}

deleteProj(id:any){
  this.projSV.deleteProject(id);
}

editproj(){
  this.projShow=false;
  this.projEdit=true;
}
guardarproj(){
  this.projShow=true;
  this.projEdit=false;
}
addColabtoProj(ev:any){
  if(!this.projColab.includes(ev))
  this.projColab.push(ev);
}
addColabtoProjBd(ev:any,list:any,id:any){
  if(list.filter((x:any)=>x.id==ev.value.id).length()==0){
    this.projSV.createProjectColab(ev.value.id,id);
    this.getlistprojects();
  }
}
deleteColabtoProjBd(ev:any){
  this.projSV.deleteProjectColab(ev);
  this.getlistprojects();
}

}
