import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtAlbumListComponent } from './art-album-list.component';
import { ArtAlbumListRoutingModule } from './art-album-list-routing.module';



@NgModule({
  declarations: [
    ArtAlbumListComponent,
  ],
  imports: [
    CommonModule,
    ArtAlbumListRoutingModule,

    //external imports

  ]
})
export class ArtAlbumListModule { }
