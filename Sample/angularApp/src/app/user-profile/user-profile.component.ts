import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './modal-basic/modal-basic.component';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from '../shared/message-service.service';
import { DepartmentService } from '../shared/department.service';
import { DEPARTMENTS } from '../shared/department.model';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user={
    role:localStorage.getItem('userRole')
  };
  constructor(private navigationService:NavigationService,public userService: UserService, private router: Router,private toastr: ToastrService,public messageService: MessageServiceService,public departmentService:DepartmentService) { }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  message=true;

  tOfViewProfile=true;//this is for view user profile
  tOfViewEditProfile=false;//this is for edit user profile
  ngOnInit() {
   this.getUserdetailes();
   //this.setNavDisable();
  };
  

//to open profile view
toOpenView(){
  this.refresh();
  this.tOfViewProfile=true;
}
//to open edit profile
toEditProfile(){
  this.refresh();
  this.tOfViewEditProfile=true;
}

refresh(){
  this.tOfViewProfile=false;
  this.tOfViewEditProfile=false;
}



onLogout(){
    this.userService.deleteToken();
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
    
  }
 
getUserdetailes(){
    this.userService.getUserProfile().subscribe(
      res => {
         this.userService.userDetails = res['user'];
      },
      err => { 
        //console.log(err);
        
      }
    )
  }



  
}





