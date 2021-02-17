import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { POSITIONS } from 'src/app/shared/position.model';
import { PositionService } from 'src/app/shared/position.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-model-change-post',
  templateUrl: './model-change-post.component.html',
  styleUrls: ['./model-change-post.component.css']
})
export class ModelChangePostComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  //to update user designation
  dataModel={
    name:''
  }
  constructor(private modalService: NgbModal,public userService: UserService,public positionService:PositionService) { }

  ngOnInit(): void {
    this.reset();
    this.refreshPostList();
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


//To get position without current user position
refreshPostList() {
  this.positionService.getDesigListWithout().subscribe((res) => {
    this.positionService.allPositionWithout= res as POSITIONS[];
  });
}

//to reset data model property and ng model
reset(){
  this.dataModel={
    name:''
  }
}
//changeUserPosition(data)
onSend(){
  this.userService.changeUserPosition(this.dataModel).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.refreshPostList();
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


}
