import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  username="";
  password="";
    constructor(
      private router:Router,
      private userSV: UserService, 
      //private LStorage:LocalStorageService,
      //private translateService: TranslateService,
    ) { }
  
    ngOnInit() {}
    async login(){
      this.userSV.login(this.username,this.password)      
      .then(async (res) => {
      await this.userSV.getUserByUsernameandPass(this.username,this.password).subscribe((r)=>{
        //localStorage.setItem("isLogged", "true");
            //this.LStorage.setVariable("isLoginRegister","true");
           // this.LStorage.setVariable("rol_Id",r[0].role_id);
            this.router.navigate(['/pages']);
  })
  }).catch((error) => {
      
    window.alert(error.message)
  })
    }

}
