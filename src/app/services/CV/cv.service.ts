import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(public dbf: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string, 
    ) { }
      //Infos
  SetInfoData(a:any) {
    const aRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Infos/${a.id}`
    );
    
    const Data: Info = {
      id: a.id,
      descripcion:a.descripcion,
      nombre:a.nombre,
      subtitulo: a.subtitulo,
      imgUrl:a.imgUrl,
      pdfCV:a.pdfCV
    };
    return aRef.set(Data, {
      merge: true,
    });
  }
  public getListInfos(){
    let b = this.dbf.collection<Info>('/Infos',ref=>ref.limit(1));
    return b.valueChanges();
  }

  public async getInfo(id:string){
    let a=new Info();
     let af= this.dbf.doc<Info>(`Infos/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.nombre=arg.payload.data()!.nombre;
      a.descripcion=arg.payload.data()!.descripcion;
      a.subtitulo=arg.payload.data()!.subtitulo;
      a.imgUrl=arg.payload.data()!.imgUrl;
      a.pdfCV=arg.payload.data()!.pdfCV;
    });
    return a;
  }

  public editInfo(id:string,  n:string,desc:any,subtitulo:string){
    this.dbf.doc(`Infos/${id}`).set({
      nombre:n,
      descipcion:desc,
      subtitulo:subtitulo,
    },{merge:true});
    
  }
  public editInfoIMG(id:string,imgUrl:any){
    this.dbf.doc(`Infos/${id}`).set({
      imgUrl:imgUrl
    },{merge:true});
    
  }
  public editInfoPDF(id:string, pdfCV:any){
    this.dbf.doc(`Infos/${id}`).set({
      pdfCV:pdfCV
    },{merge:true});
    
  }
//links
SetLinkData(a:any) {
  const aRef: AngularFirestoreDocument<any> = this.dbf.doc(
    `Links/${a.id}`
  );
  
  const Data: Link = {
    id: a.id,
    icon:a.icon,
    link:a.link,
    nombre:a.nombre,
  };
  return aRef.set(Data, {
    merge: true,
  });
}
public getListLinks(){
  let b = this.dbf.collection<Link>('/Links');
  return b.valueChanges();
}

public async getLink(id:string){
  let a=new Link();
   let af= this.dbf.doc<Link>(`Links/${id}`);
   af.snapshotChanges().subscribe(arg =>{ 
    a.id=arg.payload.data()!.id;
    a.nombre=arg.payload.data()!.nombre;
    a.icon=arg.payload.data()!.icon;
    a.link=arg.payload.data()!.link;
  });
  return a;
}


public async deleteLink(id:string){
  let af= this.dbf.doc<Link>(`Links/${id}`);
  af.delete();
}
public editLink(id:string, icon:string, n:string,link:any){
  this.dbf.doc(`Links/${id}`).set({
    nombre:n,
    link:link,
    icon:icon
  },{merge:true});
  
}
public createLink(link:string,n:string,iconName:string){
  let a:Link=new Link();
  a.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
  a.link=link;
  a.nombre=n;
  a.icon=iconName;
  this.SetLinkData(a);
  
}

      //Trayectorias
      SetTrayectoriaData(a:any) {
        const aRef: AngularFirestoreDocument<any> = this.dbf.doc(
          `Trayectorias/${a.id}`
        );
        
        const Data: Trayectoria = {
          id: a.id,
          descripcion:a.descripcion,
        titulo: a.titulo,
        centro:a.centro,
        fechaEntrada:a.fechaEntrada,
        fechaSalida:a.fechaSalida,
        isEducativo:a.isEducativo,
        subtitulo:a.subtitulo,
        tecnologias:a.tecnologias
        };
        return aRef.set(Data, {
          merge: true,
        });
      }
      public getListTrayectorias(){
        let b = this.dbf.collection<Trayectoria>('/Trayectorias');
        return b.valueChanges();
      }

      public getListTrayectoriasEducativas(){
        let b = this.dbf.collection<Trayectoria>('/Trayectorias',ref => ref.where("isEducativo","==",true));
        return b.valueChanges();
      }

      public getListTrayectoriasNOEducativas(){
        let b = this.dbf.collection<Trayectoria>('/Trayectorias',ref => ref.where("isEducativo","==",false));
        return b.valueChanges();
      }
    
      public async getTrayectoria(id:string){
        let a=new Trayectoria();
         let af= this.dbf.doc<Trayectoria>(`Trayectorias/${id}`);
         af.snapshotChanges().subscribe(arg =>{ 
          a.id=arg.payload.data()!.id;
          a.centro=arg.payload.data()!.centro;
          a.fechaEntrada=arg.payload.data()!.fechaEntrada;
          a.fechaSalida=arg.payload.data()!.fechaSalida;
          a.isEducativo=arg.payload.data()!.isEducativo;
          a.subtitulo=arg.payload.data()!.subtitulo;
          a.tecnologias=arg.payload.data()!.tecnologias;
          a.titulo=arg.payload.data()!.titulo;
          a.descripcion=arg.payload.data()!.descripcion;
        });
        return a;
      }
    
    
      public async deleteTrayectoria(id:string){
        let af= this.dbf.doc<Trayectoria>(`Trayectorias/${id}`);
        af.delete();
      }
      public editTrayectoria(id:string,titulo:string,desc:any,subtitulo:string,centro:string,fechaEntrada:string,fechaSalida:string,isEducativo:boolean,tecnologias:Array<any>){
        this.dbf.doc(`Trayectorias/${id}`).set({
          titulo:titulo,
          descipcion:desc,
          centro:centro,
          fechaEntrada:fechaEntrada,
          fechaSalida:fechaSalida,
          isEducativo:isEducativo,
          subtitulo:subtitulo,
          tecnologias:tecnologias
        },{merge:true});
        
      }
      public createTrayectoria(des:string,titulo:string,subtitulo:string,centro:string,fechaEntrada:string,fechaSalida:string,isEducativo:boolean,tecnologias:Array<any>){
        let a:Trayectoria=new Trayectoria();
        a.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
        a.descripcion=des;
        a.titulo=titulo;
        a.centro=centro;
        a.fechaEntrada=fechaEntrada;
        a.fechaSalida=fechaSalida;
        a.isEducativo=isEducativo;
        a.subtitulo=subtitulo;
        a.tecnologias=tecnologias;
        this.SetTrayectoriaData(a);
        
      }

  //Conocimientos
  SetConocimientosData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Conocimientos/${Lenguaje.id}`
    );
    
    const Data: Conocimientos = {
      id: Lenguaje.id,
      graph_id:Lenguaje.graph_id,
      label:Lenguaje.label,
      data:Lenguaje.data,
      color:Lenguaje.color
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListConocimientoss(){
    let b = this.dbf.collection<Conocimientos>('/Conocimientos');
    return b.valueChanges();
  }

  public getListConocimientossByGraph(id:any){
    let b = this.dbf.collection<Conocimientos>('/Conocimientos',ref => ref.where("graph_id","==",id));
    return b.valueChanges();
  }

  public async getConocimientos(id:string){
    let a=new Conocimientos();
     let af= this.dbf.doc<Conocimientos>(`Conocimientos/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.graph_id=arg.payload.data()!.graph_id;
      a.label=arg.payload.data()!.label;
      a.data=arg.payload.data()!.data;
      a.color=arg.payload.data()!.color;
    });
    return a;
  }


  public async deleteConocimientos(id:string){
    let af= this.dbf.doc<Conocimientos>(`Conocimientos/${id}`);
    af.delete();
  }
  public editConocimientos(id:string,  label:string, graph_id:any,data:number,color:any){
    this.dbf.doc(`Conocimientos/${id}`).set({
      label:label,
      data:data,
      graph_id:graph_id,
      color:color
    },{merge:true});
    
  }
  public createConocimientos(graph_id:any,data:number,label:string,color:string){
    let lenguaje:Conocimientos=new Conocimientos();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.graph_id=graph_id;
    lenguaje.data=data;
    lenguaje.label=label;
    lenguaje.color=color;
    this.SetConocimientosData(lenguaje);
    
  }

  //Graficos
  SetGraficosData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Graficos/${Lenguaje.id}`
    );
    
    const Data: Grafico = {
      id: Lenguaje.id,
      title:Lenguaje.title,
      tipo_grafico_id:Lenguaje.tipo_grafico_id
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListGraficos(){
    let b = this.dbf.collection<Grafico>('/Graficos');
    return b.valueChanges();
  }

  public getListGraficoBytipo_grafico_id(type_id:any){
    let b = this.dbf.collection<Grafico>('/Graficos',ref=>ref.where('tipo_grafico_id',"==",type_id));
    return b.valueChanges();
  }

  public async getGraficos(id:string){
    let a=new Grafico();
     let af= this.dbf.doc<Grafico>(`Graficos/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.title=arg.payload.data()!.title;
      a.tipo_grafico_id=arg.payload.data()!.tipo_grafico_id;
    });
    return a;
  }

  public editGraficos(title:any,tipo_grafico_id:any,id:any){
    this.dbf.doc(`Graficos/${id}`).set({
      title:title,
      tipo_grafico_id:tipo_grafico_id
    },{merge:true});
    
  }

  public async deleteGraficos(id:string){
    let af= this.dbf.doc<Grafico>(`Graficos/${id}`);
    af.delete();
  }

  public createGraficos(title:any,tipo_grafico:any){
    let lenguaje:Grafico=new Grafico();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.title=title;
    lenguaje.tipo_grafico_id=String(tipo_grafico);
    this.SetGraficosData(lenguaje);
    
  }

}
export class Info{
  id:string="";
  imgUrl:string="";
  nombre:string="";
  subtitulo:string="";
  descripcion:string="";
  pdfCV:string="";
 }
 export class Link{
  id:string="";
  icon:string="";
  nombre:string="";
  link:string="";
 }
 export class Trayectoria{
  id:string="";
  titulo:string="";
  subtitulo:string="";
  centro:string="";
  fechaEntrada:string="";
  fechaSalida:string="";
  descripcion:string="";
  isEducativo:boolean=false;
  tecnologias:Array<any>=[];
 }
 export class Conocimientos{
  id:string="";
  label:string="";
  data:number=0;
  graph_id="";
  color="";
 }
 export class Grafico{
  id:string="";
  title:string="";
  tipo_grafico_id:string="";
  //datos para hacer graficos
 }