import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {
id:any;
project:any;
colabList:any=[];
  constructor(
    private Aroute: ActivatedRoute,
    private projSV: ProjectService
  ) { }

  ngOnInit(): void {
    this.id = this.Aroute.snapshot.paramMap.get('id');
    this.getProjectData();
    this.getColabs();
  }

  async getProjectData(){
    this.project=await this.projSV.getProject(this.id);
    console.log(this.project)
  }
  async getColabs(){
   this.colabList=await this.projSV.getListColabsByProject(this.id);
    
  }

}
