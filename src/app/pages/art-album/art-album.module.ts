import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtAlbumComponent } from './art-album.component';
import { ArtAlbumRoutingModule } from './art-album-routing.module';



@NgModule({
  declarations: [
    ArtAlbumComponent,
  ],
  imports: [
    CommonModule,
    ArtAlbumRoutingModule,

    //external imports

  ]
})
export class ArtAlbumModule { }
