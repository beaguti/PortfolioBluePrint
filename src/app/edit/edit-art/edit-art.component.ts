import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ArtService } from 'src/app/services/art/art.service';
import { FileUploadService } from 'src/app/services/files/file-upload.service';

@Component({
  selector: 'app-edit-art',
  templateUrl: './edit-art.component.html',
  styleUrls: ['./edit-art.component.scss']
})
export class EditArtComponent implements OnInit{
  //view
  listAlbums:any[]=[];
  listImagenes:any[]=[];
  //show
  albumShow=true;
  albumEdit=false;
  imgShow=true;
  imgEdit=false;
  //create
  albumNombre="";
albumDesc="";
imgNombre="";
imgDesc="";
imgIsPortada=false;
imgAlbumId="";
imgImgUrl="";
imgOrden=0;

constructor(
  private artSV:ArtService,
  private fileUploadService: FileUploadService,
  @Inject(LOCALE_ID) private locale: string,
) { }

ngOnInit(): void {
  this.getListAlbums();
  this.getListImagenes();
}

//file manager
uploadImagen(ev:any){
  this.imgImgUrl=ev.files[0];
}
uploadImagenItem(ev:any,item:any){
  item.imgUrl=ev.files[0];
}

//arte
  //albums
  getListAlbums(){
    this.artSV.getListAlbums().subscribe((res)=>{
      this.listAlbums=res;
    })
  }
  saveAlbum(item:any){
    this.artSV.editAlbum(item.id,item.nombre,item.descripcion);
    this.getListAlbums();
  }

  newAlbum(){
    this.artSV.createAlbum(this.albumDesc,this.albumNombre);
    this.albumNombre="";
    this.albumDesc="";
  }

  deleteAlbum(id:any){
    this.artSV.deleteAlbum(id);
  }

  editalbum(){
    this.albumShow=false;
    this.albumEdit=true;
  }
  guardaralbum(){
    this.albumShow=true;
    this.albumEdit=false;
  }
  //imagenes
  getListImagenes(){
    this.artSV.getListImagens().subscribe((res)=>{
      this.listImagenes=res;
    })
  }
  saveImagen(item:any){
    this.artSV.editImagen(item.id,item.nombre,item.album_id,item.descripcion,item.nombre,item.order);
    this.fileUploadService.upload(item.imgUrl,'jpg','art/'+item.album_id,item.id);
    this.getListImagenes();
  }

  newImagen(){
    let id=String(formatDate(Date.now(),'yyyy-MM-dd mm:ss',this.locale));
    this.artSV.createImagenWithID(id,this.imgAlbumId,this.imgDesc,this.imgNombre,"",this.imgIsPortada,this.imgOrden).finally(()=>{
      this.fileUploadService.upload(this.imgImgUrl,'jpg','art/'+this.imgAlbumId,id);
      this.imgAlbumId="";
      this.imgDesc="";
      this.imgNombre="";
      this.imgImgUrl="";
      this.imgIsPortada=false;
  });
  }

  deleteImagen(id:any){
    this.artSV.deleteImagen(id);
  }

  editimagen(){
    this.imgShow=false;
    this.imgEdit=true;
  }
  guardarimagen(){
    this.imgShow=true;
    this.imgEdit=false;
  }

}
