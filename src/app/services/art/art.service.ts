import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArtService {

  constructor(public dbf: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string, 
    ) { }
      //Albums
  SetAlbumData(Lenguaje:any) {
    const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
      `Albums/${Lenguaje.id}`
    );
    
    const Data: Album = {
      id: Lenguaje.id,
      descripcion:Lenguaje.descripcion,
      nombre:Lenguaje.nombre,
    };
    return LenguajeRef.set(Data, {
      merge: true,
    });
  }
  public getListAlbums(){
    let b = this.dbf.collection<Album>('/Albums');
    return b.valueChanges();
  }

  public async getAlbum(id:string){
    let a=new Album();
     let af= this.dbf.doc<Album>(`Albums/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.nombre=arg.payload.data()!.nombre;
      a.descripcion=arg.payload.data()!.descripcion;
    });
    return a;
  }


  public async deleteAlbum(id:string){
    let af= this.dbf.doc<Album>(`Albums/${id}`);
    af.delete();
  }
  public editAlbum(id:string,  n:string,desc:any){
    this.dbf.doc(`Albums/${id}`).set({
      nombre:n,
      descipcion:desc
    },{merge:true});
    
  }
  public createAlbum(des:string,n:string){
    let lenguaje:Album=new Album();
    lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    lenguaje.descripcion=des;
    lenguaje.nombre=n;
    this.SetAlbumData(lenguaje);
    
  }

  //imagen
        SetImagenData(Lenguaje:any) {
          const LenguajeRef: AngularFirestoreDocument<any> = this.dbf.doc(
            `Imagenes/${Lenguaje.id}`
          );
          
          const Data: Imagen = {
            id: Lenguaje.id,
            descripcion:Lenguaje.descripcion,
            nombre:Lenguaje.nombre,
            album_id:Lenguaje.album_id,
            imgUrl:Lenguaje.imgUrl,
            isPortada:Lenguaje.isPortada,
            order:Lenguaje.order,
          };
          return LenguajeRef.set(Data, {
            merge: true,
          });
        }
        public getListImagens(){
          let b = this.dbf.collection<Imagen>('/Imagenes');
          return b.valueChanges();
        }

        public getPortadaAlbum(id:any){
          let b = this.dbf.collection<Imagen>('/Imagenes',ref => ref.where("album_id","==",id).where("isPortada","==",true));
          return b.valueChanges();
        }

        public getImgByOrder(id:any,num:any){
          let b = this.dbf.collection<Imagen>('/Imagenes',ref => ref.where("album_id","==",id).where("order","==",num));
          return b.valueChanges();
        }

        public getListImagensByAlbum(id:any){
          let b = this.dbf.collection<Imagen>('/Imagenes',ref => ref.where("album_id","==",id));
          return b.valueChanges();
        }

        public async getImagen(id:string){
          let a=new Imagen();
           let af= this.dbf.doc<Imagen>(`Imagenes/${id}`);
           af.snapshotChanges().subscribe(arg =>{ 
            a.id=arg.payload.data()!.id;
            a.album_id=arg.payload.data()!.album_id;
            a.nombre=arg.payload.data()!.nombre;
            a.descripcion=arg.payload.data()!.descripcion;
            a.imgUrl=arg.payload.data()!.imgUrl;
            a.isPortada=arg.payload.data()!.isPortada;
            a.order=arg.payload.data()!.order;
          });
          return a;
        }
      
      
        public async deleteImagen(id:string){
          let af= this.dbf.doc<Imagen>(`Imagenes/${id}`);
          af.delete();
        }
        public editImagen(id:string,  n:string, album_id:any,desc:any,isPortada:any,order:any){
          this.dbf.doc(`Imagenes/${id}`).set({
            nombre:n,
            descipcion:desc,
            album_id:album_id,
            isPortada:isPortada,
            order:order
          },{merge:true});
          
        }
        public editImagenIMG(id:string, img:any){
          this.dbf.doc(`Imagenes/${id}`).set({
            imgUrl:img,
          },{merge:true});
          
        }
        public createImagen(album_id:any,des:string,n:string,imgUrl:any,isPortada:boolean,order:number){
          let lenguaje:Imagen=new Imagen();
          lenguaje.id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
          lenguaje.album_id=album_id;
          lenguaje.descripcion=des;
          lenguaje.nombre=n;
          lenguaje.imgUrl=imgUrl;
          lenguaje.isPortada=isPortada;
          lenguaje.order=order;
          this.SetImagenData(lenguaje);
          
        }
        public createImagenWithID(id:string,album_id:string,des:string,n:string,imgUrl:any,isPortada:boolean,order:number){
          let lenguaje:Imagen=new Imagen();
          lenguaje.id=id;
          lenguaje.album_id=album_id;
          lenguaje.descripcion=des;
          lenguaje.nombre=n;
          lenguaje.imgUrl=imgUrl;
          lenguaje.isPortada=isPortada;
          lenguaje.order=order;
          return this.SetImagenData(lenguaje);
          
        }
}
export class Album{
  id:string="";
  nombre:string="";
  descripcion:string="";
 }
 export class Imagen{
  id:string="";
  nombre:string="";
  descripcion:string="";
  imgUrl:string="";
  isPortada:boolean=false;
  album_id:string="";
  order:number=0;
 }