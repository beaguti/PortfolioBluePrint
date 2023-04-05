import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoComponent } from './project-info.component';
import { ProjectInfoRoutingModule } from './project-info-routing.module';



@NgModule({
  declarations: [
    ProjectInfoComponent,
  ],
  imports: [
    CommonModule,
    ProjectInfoRoutingModule,

    //external imports

  ]
})
export class ProjectInfoModule { }
