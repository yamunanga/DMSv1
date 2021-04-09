import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-panel-profile',
  templateUrl: './edit-panel-profile.component.html',
  styleUrls: ['./edit-panel-profile.component.css']
})
export class EditPanelProfileComponent implements OnInit {
  
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
        //console.log(err);
        
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
