import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtAlbumComponent } from './art-album.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: ArtAlbumComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtAlbumRoutingModule { }
