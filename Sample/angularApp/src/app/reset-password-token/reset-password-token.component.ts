import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-reset-password-token',
  templateUrl: './reset-password-token.component.html',
  styleUrls: ['./reset-password-token.component.css']
})
export class ResetPasswordTokenComponent implements OnInit {

  constructor(public userService: UserService,private router : Router,private activeRoute:ActivatedRoute,private toastr: ToastrService) { }
  isTrue;
  tempModel={
    newPassword:'',
    confirmPassword:''
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  ngOnInit(): void {
    let token=String(this.activeRoute.snapshot.paramMap.get('token'));
    this.userService.resetPassData.resetLink=token;
  }
  onSubmit(form: NgForm) {
    this.compare();
    if(this.isTrue==true){
    this.userService.resetPassword(this.userService.resetPassData/*form.value*/).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.isTrue=false;
        this.router.navigateByUrl('/login');
        this.toastr.success('Password Reset successful');
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
  }else{
    this.serverErrorMessages = 'Password Not Match Enter Again';
    //this.resetForm(form);
  }
}



  toLogin(){
    this.router.navigateByUrl('/login');
  }
  resetForm(form: NgForm) {
    this.userService.resetPassData= {
     resetLink:'',
     newPass:'',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  

  //To validate new and confirm passwords
  compare(){
    if(this.tempModel.newPassword==this.tempModel.confirmPassword){
      this.userService.resetPassData.newPass=this.tempModel.newPassword;
      this.isTrue=true;

    }
  }


}
