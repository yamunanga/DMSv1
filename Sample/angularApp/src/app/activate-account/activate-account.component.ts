import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import {UserService } from '../shared/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(public userService: UserService,private router : Router,private activeRoute:ActivatedRoute) { }
  //This activated route use for track to token come with url
  
  ngOnInit(): void {
    let token=String(this.activeRoute.snapshot.paramMap.get('token'));
    this.userService.activationToken.token=token;
  }
  onSubmit(form: NgForm) {
    this.userService.activateUserAccount(this.userService.activationToken/*form.value*/).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 40000);
        //this.router.navigateByUrl('/login');
        //this.resetForm(form);
      },
      err => {
       /* if (err.status === 400) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';*/
          this.serverErrorMessages = err.error;
        
      },
    );
  }
  toLogin(){
    this.router.navigateByUrl('/login');
  }
  /*resetForm(form: NgForm) {
    this.userService.activationToken= {
      token: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }*/

}


