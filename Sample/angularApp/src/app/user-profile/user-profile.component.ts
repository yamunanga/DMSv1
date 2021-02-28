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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user={
    role:localStorage.getItem('userRole')
  };
  delModel={
    _id:''
  }
  department;//ng model for test redio
  //userDetails;
  constructor(public userService: UserService, private router: Router,private toastr: ToastrService,public messageService: MessageServiceService,public departmentService:DepartmentService) { }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  message=true;
  ngOnInit() {
   this.getUserdetailes();
   this.refreshDepList();
  };

  onLogout(){
    this.userService.deleteToken();
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
    
  }
  //to update user profile
  toUpdate(){
    
    this.router.navigate(['/register']);
  }


  toTest(){
    this.router.navigate(['/activateAccount']);
    //this.router.navigate(['/updateprofile']);
  }

  toRoleBase(){
   
  }
  
  getUserdetailes(){
    this.userService.getUserProfile().subscribe(
      res => {
         this.userService.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    )
  }
 //To delete current user account 
 deleteAccount(_id){
  this.delModel._id=_id
  if (confirm('Are you sure to Delete ?') == true) {
    this.userService.deleteUser( this.delModel).subscribe((res) => {
    //this.refreshArcUsersList();
    this.toastr.success('Account Deleted !');
    this.onLogout();
    }, err => {
      if (err.status === 404) {
        this.toastr.error('User Does not exist !');
      }
      else if (err.status === 422) {
        this.toastr.error('Eror from Backend!');
      }
      else
        this.toastr.error('Something went wrong!');
      
    },
      
    
    );
  }
 }

//for testing purposes

//departmentService
//To get departments
refreshDepList() {
  this.departmentService.getDepList().subscribe((res) => {
    this.departmentService.allDeps= res as DEPARTMENTS[];
  });
}
  
}





