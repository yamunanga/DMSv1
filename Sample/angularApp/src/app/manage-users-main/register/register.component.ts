import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DEPARTMENTS } from '../../shared/department.model';
import { DepartmentService } from '../../shared/department.service';
import { POSITIONS } from '../../shared/position.model';
import { PositionService } from '../../shared/position.service';

import {UserService } from '../../shared/user.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  //providers: [UserService]
})
export class RegisterComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  depName='Select Department';
  desigName='Select Designation';
  
  constructor(public userService: UserService,public departmentService:DepartmentService,public positionService:PositionService) { }

  ngOnInit(): void {
    this.resetModel();
    this.refreshDepList();
    this.refreshPositionList();
  }

  onSubmit(form: NgForm) {
   if(this.userService.selectedUser.fullName !='' && this.userService.selectedUser.email !='' && this.userService.selectedUser.password !=''  && this.userService.selectedUser.role !=''  && this.userService.selectedUser.department !='' && this.userService.selectedUser.position !=''){
    this.userService.postUser(this.userService.selectedUser).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.resetModel();
        this.depName='Select Department';
        this.desigName='Select Designation';
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if( err.status==503){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        
      },
    );
   }
  }

 resetForm(form: NgForm) {
    form.resetForm();
    this.serverErrorMessages = '';
  }

  resetModel(){
    this.userService.selectedUser = {
      // userName:'',
       fullName: '',
       email: '',
       password: '',
       role:'',
       department:'',
       position:''
     };
  }




//To get departments
refreshDepList() {
  this.departmentService.getDepList().subscribe((res) => {
    this.departmentService.allDeps= res as DEPARTMENTS[];
  });
}


//to get position
refreshPositionList(){
  this.positionService.getDesigList().subscribe((res) => {
    this.positionService.allPositions= res as POSITIONS[];
  });
}

passNameDep(name){
  this.depName=name;
}
passNamePost(name){
  this.desigName=name;
}


setUserDepartment(name){
  this.userService.selectedUser.department=name;
}
setUserDesignation(name){
  this.userService.selectedUser.position=name;
}



}
