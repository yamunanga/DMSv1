import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-model-for-other-user-role',
  templateUrl: './model-for-other-user-role.component.html',
  styleUrls: ['./model-for-other-user-role.component.css']
})
export class ModelForOtherUserRoleComponent implements OnInit {
  closeResult = '';
  constructor(private modalService: NgbModal,private userService: UserService,private router : Router) { }
  /*modelRole={
    _id:this.userService.otherUserId,
    role:'',
  }*/
  showSucessMessage: boolean;
  serverErrorMessages: string;
  passModel;//this is combine of _id and role for pass to backend
  passModelForm;//this is for form value

  ngOnInit(): void {
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
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

}
