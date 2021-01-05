import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './modal-basic/modal-basic.component';
import { ToastrService } from 'ngx-toastr';

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
  //userDetails;
  constructor(public userService: UserService, private router: Router,private toastr: ToastrService) { }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  message=true;
  ngOnInit() {
   this.getUserdetailes();
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



  
}





