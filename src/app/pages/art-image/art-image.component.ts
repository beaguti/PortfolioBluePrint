import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from 'src/app/services/art/art.service';

@Component({
  selector: 'app-art-image',
  templateUrl: './art-image.component.html',
  styleUrls: ['./art-image.component.scss']
})
export class ArtImageComponent implements OnInit {
id:any;
imagen:any;
numMax=0;
hasPrev=true;
hasNext=true;
  constructor(
    private Aroute: ActivatedRoute,
    private router:Router,
    private artSV:ArtService
  ) { }

  ngOnInit(): void {
    this.id = this.Aroute.snapshot.paramMap.get('id');
    this.getImg();
    this.getNumMax();
  }

  getNumMax(){
    this.artSV.getListImagensByAlbum(this.imagen.album_id).subscribe((res)=>{
      this.numMax=res.length;
    })
  }
  async getImg(){
    this.imagen=await this.artSV.getImagen(this.id);
    if(this.imagen.order==1){
      this.hasPrev=false;
    }
    if(this.numMax==this.imagen.order){
      this.hasNext=false;
    }
  }
  async getImgPrev(){
    this.artSV.getImgByOrder(this.imagen.album_id,this.imagen.order-1).subscribe((res)=>{
      this.router.navigateByUrl('/art-image/'+res[0].id)
    })
    
  }
  getImgNext(){
    this.artSV.getImgByOrder(this.imagen.album_id,this.imagen.order+1).subscribe((res)=>{
      this.router.navigateByUrl('/art-image/'+res[0].id)
    })
  }
}
