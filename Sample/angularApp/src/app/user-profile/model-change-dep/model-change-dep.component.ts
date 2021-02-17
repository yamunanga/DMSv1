import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-model-change-dep',
  templateUrl: './model-change-dep.component.html',
  styleUrls: ['./model-change-dep.component.css']
})
export class ModelChangeDepComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  //this is for update department
  dataModel={
    name:''
  }
  constructor(private modalService: NgbModal,public userService: UserService,public departmentService:DepartmentService) { }

  ngOnInit(): void {
    this.refreshDepList();
    this.reset();
    this.userService.getUserdetailes();
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

 

//To get departments
refreshDepList() {
  this.departmentService.toUpdateDepartmentListCurrent().subscribe((res) => {
    this.departmentService.allDepWithout= res as DEPARTMENTS[];
  });
}

//onSend
onSend(){
  this.userService.changeUserDepartment(this.dataModel).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.refreshDepList();
      this.userService.getUserdetailes();//to refresh the observable 
      this.reset();
    },
    err => {
      if (err.status === 404) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 402){
        this.serverErrorMessages= err.error.join('<br/>');
      }
      else if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 401){
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else{
        this.serverErrorMessages= 'Something went wrong.Please contact admin.';
      }
    }
  )
}

//to reset data model property and ng model
reset(){
  this.dataModel={
    name:''
  }
}










}
