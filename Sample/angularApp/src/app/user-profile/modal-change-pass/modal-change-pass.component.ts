import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-modal-change-pass',
  templateUrl: './modal-change-pass.component.html',
  styleUrls: ['./modal-change-pass.component.css']
})
export class ModalChangePassComponent implements OnInit {

  closeResult = '';

  constructor(private modalService: NgbModal,private userService: UserService,private router : Router) {}
  isTrue;
  modelPassword={
    password:'',
  }
  //For compare passwords
  tempModel={
    newPassword:'',
    confirmPassword:''
  }
  erorModel={
    eror:'',
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  ngOnInit(): void {

  }
  compare(){
    if(this.tempModel.newPassword==this.tempModel.confirmPassword){
      this.modelPassword.password=this.tempModel.newPassword;
      this.isTrue=true;

    }
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
    this.compare();
    if(this.isTrue==true){
    this.userService.updatePass(this.modelPassword).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.isTrue=false;
        //this.router.navigateByUrl('/login');
        this.userService.getUserdetailes();
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
  
  
  resetForm(form: NgForm) {
    this.modelPassword= {
      password: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
