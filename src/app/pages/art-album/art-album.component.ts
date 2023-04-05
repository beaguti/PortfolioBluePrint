import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtService } from 'src/app/services/art/art.service';

@Component({
  selector: 'app-art-album',
  templateUrl: './art-album.component.html',
  styleUrls: ['./art-album.component.scss']
})
export class ArtAlbumComponent implements OnInit {
id:any;
album:any;
imgList:any=[];
portada:any;
  constructor(
    private Aroute: ActivatedRoute,
    private artSV:ArtService
  ) { }

  ngOnInit(): void {
    this.id = this.Aroute.snapshot.paramMap.get('id');
    this.getAlbumData();
    this.getImgList();
    this.getportada();
  }

  async getAlbumData(){
   this.album=await this.artSV.getAlbum(this.id);
  }

  getImgList(){
    this.artSV.getListImagensByAlbum(this.id).subscribe((res)=>{
      this.imgList=res;
    })
  }

  getportada(){
    this.artSV.getPortadaAlbum(this.id).subscribe((res)=>{
      this.portada=res[0].imgUrl;
    })
  }

}
