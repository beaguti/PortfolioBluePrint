import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtAlbumListComponent } from './art-album-list.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: ArtAlbumListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtAlbumListRoutingModule { }
