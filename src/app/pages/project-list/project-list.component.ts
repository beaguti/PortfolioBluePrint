import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
listProj:any=[];
  constructor(
    private projSV:ProjectService
  ) { }

  ngOnInit(): void {
    this.getListProj();
  }

  getListProj(){
    this.projSV.getListProjects().subscribe((res:any)=>{
      this.listProj=res;
    })

  }
}
