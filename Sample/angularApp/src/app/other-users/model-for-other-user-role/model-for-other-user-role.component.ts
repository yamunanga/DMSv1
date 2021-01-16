import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { PositionService } from 'src/app/shared/position.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-model-for-other-user-role',
  templateUrl: './model-for-other-user-role.component.html',
  styleUrls: ['./model-for-other-user-role.component.css']
})
export class ModelForOtherUserRoleComponent implements OnInit {
  closeResult = '';
  constructor(private modalService: NgbModal,private userService: UserService,private router : Router,public departmentService:DepartmentService,public positionService:PositionService) { }
  /*modelRole={
    _id:this.userService.otherUserId,
    role:'',
  }*/
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessageCd: boolean;
  serverErrorMessagesCd: string;
  showSucessMessageCp: boolean;
  serverErrorMessagesCp: string;
  passModel;//this is combine of _id and role for pass to backend
  passModelForm;//this is for form value
  isSubmitDep=false;//for validation purpose
  isSubmitPost=false;//for validation purpose
  ngOnInit(): void {
   // this.refreshDepsList();
   this.userService.otherUserDep.name='';
   this.userService.otherUserPost.name='';
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.resetIsSubmitDep();
      this.resetSubmitPost();
      this.resetModelData();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetIsSubmitDep();
      this.resetSubmitPost();
      this.resetModelData();
      return 'by clicking on a backdrop';
    } else {
      this.resetIsSubmitDep();
      this.resetSubmitPost();
      this.resetModelData();
      return `with: ${reason}`;
    }
   }

   onSubmit(form: NgForm) {
     //this.userService.userData.role=form.value;
     this.passModelForm=form.value;
     this.passModel={
         _id :this.userService.userData._id,
         role:this.passModelForm.role
     }
     //this.refreshUsersList();
     //this.userService.userData
     this.userService.updateOtherUserRole(this.passModel/*form.value*/).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.userService.getUserdetailes()
        this.userService.refreshUsersList()
        this.resetForm(form);
      },
      err => {
        if (err.status === 404) {
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

resetForm(form: NgForm) {
    this.passModel= {
      _id:'',
      role: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }



//For change other user department
changeDep(){
  this.isSubmitDep=true;
  this.userService.changeOtherUserDepartment( this.userService.otherUserDep).subscribe(
    res => {
      this.showSucessMessageCd = true;
      setTimeout(() => this.showSucessMessageCd = false, 4000);
      this.userService.refreshUsersList();
      this.departmentService.refreshDepsList(this.userService.otherUserDep._id);
      this.userService.otherUserDep.name='';
    },
    err => {
      if (err.status === 404) {
        this.serverErrorMessagesCd = err.error.join('<br/>');
      }
      else if(err.status === 402){
        this.serverErrorMessagesCd = err.error.join('<br/>');
      }
      else if (err.status === 422) {
        this.serverErrorMessagesCd = err.error.join('<br/>');
      }
      else if(err.status === 401){
        this.serverErrorMessagesCd = err.error.join('<br/>');
      }
      else
        this.serverErrorMessagesCd = 'Something went wrong.Please contact admin.';
      
      }
      
  );
 // this.resetIsSubmitDep();
  this.userService.refreshUsersList();
  this.departmentService.refreshDepsList(this.userService.otherUserDep._id);
}

//reset department validation
resetIsSubmitDep(){
  this.isSubmitDep=false;
  

}
//reset position validation
resetSubmitPost(){
  this.isSubmitPost=false;
}

resetModelData(){
  this.userService.otherUserDep={
    _id:'',
    name:''
  }
  this.serverErrorMessagesCd='';
}

//for reset change position model data otherUserPost
resetPostModelData(){
  this.userService.otherUserPost={
    _id:'',
    name:''
  }
  this.serverErrorMessagesCp='';
}

//change other user position
changePost(){
  this.isSubmitPost=true;
  this.userService.changeOtherUserPosition( this.userService.otherUserPost).subscribe(
    res => {
      this.showSucessMessageCp = true;
      setTimeout(() => this.showSucessMessageCp = false, 4000);
      this.userService.refreshUsersList();
      this.positionService.refreshPostList(this.userService.otherUserPost._id);
      this.userService.otherUserPost.name='';
    },
    err => {
      if (err.status === 404) {
        this.serverErrorMessagesCp = err.error.join('<br/>');
      }
      else if(err.status === 402){
        this.serverErrorMessagesCp = err.error.join('<br/>');
      }
      else if (err.status === 422) {
        this.serverErrorMessagesCp = err.error.join('<br/>');
      }
      else if(err.status === 401){
        this.serverErrorMessagesCp = err.error.join('<br/>');
      }
      else
        this.serverErrorMessagesCp = 'Something went wrong.Please contact admin.';
      
      })
      this.userService.refreshUsersList();
      this.positionService.refreshPostList(this.userService.otherUserPost._id);
}





}
