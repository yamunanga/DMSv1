import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';
import { UserProfileComponent } from '../user-profile.component';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css']
})
/*export class ModalBasicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
}*/
export class NgbdModalBasic {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  model={
    fullName:'',
  }

  constructor(private modalService: NgbModal,public userService: UserService,private router: Router) {}
  ngOnInit() {
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
      //this.getUserdetailes();
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  //Form for Full name
  onSubmit(form: NgForm) {
    this.userService.updateInfo(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.userService.getUserdetailes();//to refresh the observable 
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

  resetForm(form: NgForm) {
    this.model= {
      fullName: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  


}