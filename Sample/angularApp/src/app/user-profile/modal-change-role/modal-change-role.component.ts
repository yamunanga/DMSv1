import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-modal-change-role',
  templateUrl: './modal-change-role.component.html',
  styleUrls: ['./modal-change-role.component.css']
})
export class ModalChangeRoleComponent implements OnInit {

  closeResult = '';

  constructor(private modalService: NgbModal,private userService: UserService,private router : Router) {}
  modelRole={
    role:'',
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
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
      this.resetModelData();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetModelData();
      return 'by clicking on a backdrop';
    } else {
      this.resetModelData();
      return `with: ${reason}`;
    }
   }

  onSubmit(form: NgForm) {
    this.userService.updateUserRole(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        // this.getUserdetailes();
        //localStorage.removeItem('userRole');
         //localStorage.setItem('userRole',this.userService.userInfo.role);
         this.userService.deleteToken();
         localStorage.removeItem('userRole');
         this.userService.getUserdetailes();
         //this.router.navigate(['/login']);
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
  }
  resetForm(form: NgForm) {
    this.modelRole= {
      role: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  
  resetModelData(){
    this.modelRole= {
      role: '',
    };
  }
}

