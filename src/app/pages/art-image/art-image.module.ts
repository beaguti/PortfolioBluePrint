import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtImageComponent } from './art-image.component';
import { ArtImageRoutingModule } from './art-image-routing.module';



@NgModule({
  declarations: [
    ArtImageComponent,
  ],
  imports: [
    CommonModule,
    ArtImageRoutingModule,

    //external imports

  ]
})
export class ArtImageModule { }
