import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectInfoComponent } from './project-info.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{
  path: '',
  component: ProjectInfoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectInfoRoutingModule { }
