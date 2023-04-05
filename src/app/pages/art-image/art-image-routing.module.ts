import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtImageComponent } from './art-image.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: ArtImageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtImageRoutingModule { }
