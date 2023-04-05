import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  showCV=true;
  showProject=false;
  showArt=false;
  cvClass='nav-link active';
  projClass='nav-link';
  artClass='nav-link';
  constructor(
    private userSV:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.userSV.SignOut();
    this.router.navigate(['/']);
  }

  changeTo(cond: any) {

    switch (cond) {
      case "cv":
        this.cvClass = 'nav-link active';
        this.projClass = 'nav-link';
        this.artClass = 'nav-link';

        this.showCV = true;
        this.showProject = false;
        this.showArt = false;

        break;

      case "proj":
        this.projClass = 'nav-link active';
        this.cvClass = 'nav-link';
        this.artClass = 'nav-link';

        this.showProject = true;
        this.showCV = false;
        this.showArt = false;

        break;

      case "art":
        this.artClass = 'nav-link active';
        this.cvClass = 'nav-link';
        this.projClass = 'nav-link';

        this.showArt = true;
        this.showCV = false;
        this.showProject = false;

        break;

      default:
        this.cvClass = 'nav-link active';
        this.projClass = 'nav-link';
        this.artClass = 'nav-link';

        this.showCV = true;
        this.showProject = false;
        this.showArt = false;

        break;

    }

  }




}
