import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
    },
    {
      path: 'cv',
      loadChildren: () => import('./cv/cv.module')
        .then(m => m.CvModule),
    },
    //projectos
    {
      path: 'project-list',
      loadChildren: () => import('./project-list/project-list.module')
        .then(m => m.ProjectListModule),
    },
    {
      path: 'project/:id',
      loadChildren: () => import('./project-info/project-info.module')
        .then(m => m.ProjectInfoModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
