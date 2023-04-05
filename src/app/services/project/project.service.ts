import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(public dbf: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string, 
    ) { }
      //projects
  SetProjectData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Projects/${Lenguaje.id}`
    );
    
    const Data: Project = {
      id: Lenguaje.id,
      descripcion:Lenguaje.descripcion,
      nombre:Lenguaje.nombre,
      fecha:Lenguaje.fecha,
      imgUrl:Lenguaje.imgUrl,
      link:Lenguaje.link,
      code:Lenguaje.code
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListProjects(){
    let b = this.dbf.collection<Project>('/Projects');
    return b.valueChanges();
  }

  public async getProject(id:string){
    let a=new Project();
     let af= this.dbf.doc<Project>(`Projects/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.link=arg.payload.data()!.link;
      a.nombre=arg.payload.data()!.nombre;
      a.descripcion=arg.payload.data()!.descripcion;
      a.imgUrl=arg.payload.data()!.imgUrl;
      a.fecha=arg.payload.data()!.fecha;
      a.code=arg.payload.data()!.code;
    });
    return a;
  }


  public async deleteProject(id:string){
    let af= this.dbf.doc<Project>(`Projects/${id}`);
    af.delete();
  }
  public editProject(id:string,  n:string, fecha:any,desc:any,link:any,code:any){
    this.dbf.doc(`Projects/${id}`).set({
      nombre:n,
      descipcion:desc,
      fecha:fecha,
      link:link,
      code:code
    },{merge:true});
    
  }
  public editProjectIMG(id:string, img:any){
    this.dbf.doc(`Projects/${id}`).set({
      imgUrl:img,
    },{merge:true});
    
  }
  public createProject(fecha:any,des:string,n:string,link:any,imgUrl:any,listcolab:any,code:any){
    let lenguaje:Project=new Project();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.fecha=fecha;
    lenguaje.descripcion=des;
    lenguaje.nombre=n;
    lenguaje.imgUrl=imgUrl;
    lenguaje.link=link;
    lenguaje.code=code;
    listcolab.forEach((e:any)=>{
      this.createProjectColab(e.value.id,lenguaje.id);
    })
    this.SetProjectData(lenguaje);
    
  }
  public createProjectWithID(id:string,fecha:string,des:string,n:string,link:string,imgUrl:any,listcolab:any,code:any){
    let lenguaje:Project=new Project();
    lenguaje.id=id;
    lenguaje.fecha=fecha;
    lenguaje.descripcion=des;
    lenguaje.nombre=n;
    lenguaje.link=link;
    lenguaje.code=code;
    listcolab.forEach((e:any)=>{
      this.createProjectColab(e.value.id,lenguaje.id);
    })
    return this.SetProjectData(lenguaje);
    
  }
  //project_colab
  SetProjectColabData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Project_colabs/${Lenguaje.id}`
    );
    
    const Data: ProjectColab = {
      id: Lenguaje.id,
      colab_id:Lenguaje.colab_id,
      project_id:Lenguaje.project_id
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListProjectColabs(){
    let b = this.dbf.collection<ProjectColab>('/Project_colabs');
    return b.valueChanges();
  }
  public getListProjectColabsByProject(id:string){
    let b = this.dbf.collection<ProjectColab>('/Project_colabs',ref => ref.where("project_id","==",id));
    return b.valueChanges();
  }

  public async getProjectColab(id:string){
    let a=new ProjectColab();
    let af= this.dbf.doc<ProjectColab>(`Project_colabs/${id}`);
    af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.colab_id=arg.payload.data()!.colab_id;
      a.project_id=arg.payload.data()!.project_id;
    });
    return a;
  }


  public async deleteProjectColab(id:string){
    let af= this.dbf.doc<ProjectColab>(`Project_colabs/${id}`);
    af.delete();
  }
  public createProjectColab(colab_id:string,project_id:string){
    let lenguaje:ProjectColab=new ProjectColab();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.colab_id=colab_id;
    lenguaje.project_id=project_id;
    this.SetProjectColabData(lenguaje);
    
  }

  //colaboradores
  SetColabData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Colabs/${Lenguaje.id}`
    );
    
    const Data: Colab = {
      id: Lenguaje.id,
      nombre:Lenguaje.nombre,
      imgUrl:Lenguaje.imgUrl,
      url:Lenguaje.url
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListColabs(){
    let b = this.dbf.collection<Colab>('/Colabs');
    return b.valueChanges();
  }
  public getListColabsByProject(id:any){
    let b: any[]=[];
    this.getListProjectColabsByProject(id).subscribe((res)=>{
      res.forEach(async r => {
        b.push(await this.getColab(r.colab_id));
      });
    })
    return b;
  }

  public async getColab(id:string){
    let a=new Colab();
     let af= this.dbf.doc<Colab>(`Colabs/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.url=arg.payload.data()!.url;
      a.nombre=arg.payload.data()!.nombre;
      a.imgUrl=arg.payload.data()!.imgUrl;
    });
    return a;
  }


  public async deleteColab(id:string){
    let af= this.dbf.doc<Colab>(`Colabs/${id}`);
    af.delete();
  }
  public editColab(id:string,  n:string,link:any){
    this.dbf.doc(`Colabs/${id}`).set({
      nombre:n,
      url:link
    },{merge:true});
    
  }
  public editColabIMG(id:string,img:any){
    this.dbf.doc(`Colabs/${id}`).set({
      imgUrl:img,
    },{merge:true});
    
  }

  public createColab(n:string,link:any,imgUrl:any){
    let lenguaje:Colab=new Colab();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.nombre=n;
    lenguaje.imgUrl=imgUrl;
    lenguaje.url=link;
     return this.SetColabData(lenguaje);
    
  }
  public createColabWithID(id:string,n:string,link:string,imgUrl:any){
    let lenguaje:Colab=new Colab();
    lenguaje.id=id;
    lenguaje.url=link;
    lenguaje.nombre=n;
    lenguaje.imgUrl=imgUrl;
    return this.SetColabData(lenguaje);
    
  }

}
export class Project{
  id:string="";
  nombre:string="";
  fecha:string="";
  descripcion:string="";
  link:string="";
  code:string="";
  imgUrl:string="";
 }
 export class Colab{
  id:string="";
  nombre:string="";
  url:string="";
  imgUrl:string="";
 }
 export class ProjectColab{
  id:string="";
  colab_id:string="";
  project_id:string="";
 }