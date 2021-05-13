import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NavigationService } from 'src/app/shared/navigation.service';

import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  //userInfo;
  constructor(public  navigationService: NavigationService,private userService: UserService,private router : Router) { }
 
  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  showSucessMessage: boolean;
  ngOnInit() {
    
  }
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.userService.userInfo=(res['user']);//result from backend
        localStorage.setItem('userRole',this.userService.userInfo.role);
        this.userService.userStatus.status="online";
        this.toPutuserStatus();
       // this.userService.isLoggedIn();
       // this.userService.checkUser();
        //this.router.navigateByUrl('/userprofile/view');
        this.router.navigateByUrl('/home/userprofile/view');
      
  
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
//To update user Status
toPutuserStatus() {
  this.userService.updateUserStatus(this.userService.userStatus).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
       //this.router.navigate(['/login']);
    },
    err => {
      if (err.status === 400) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 402){
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 401){
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      
    },
  );
}




}
