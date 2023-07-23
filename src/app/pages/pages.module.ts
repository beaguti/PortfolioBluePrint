import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { CvModule } from './cv/cv.module';
import { HomeModule } from './home/home.module';
import { ProjectListModule } from './project-list/project-list.module';
import { ProjectInfoModule } from './project-info/project-info.module';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    //pages modules
    HomeModule,
    CvModule,
    ProjectListModule,
    ProjectInfoModule,

    //external imports
    
  ]
})
export class PagesModule { }
