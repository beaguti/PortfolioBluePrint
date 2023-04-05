import { Component, OnInit } from '@angular/core';
import { ArtService } from 'src/app/services/art/art.service';

@Component({
  selector: 'app-art-album-list',
  templateUrl: './art-album-list.component.html',
  styleUrls: ['./art-album-list.component.scss']
})
export class ArtAlbumListComponent implements OnInit {
albumList:any=[]
  constructor(
    private artSV:ArtService
  ) { }

  ngOnInit(): void {
    this.getALbumList();
  }

  getALbumList(){
    this.artSV.getListAlbums().subscribe((res)=>{
      this.albumList=res;
    })
  }
}
