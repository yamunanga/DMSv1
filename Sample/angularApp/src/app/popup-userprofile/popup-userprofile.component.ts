import { Component, OnInit } from '@angular/core';
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-popup-userprofile',
  templateUrl: './popup-userprofile.component.html',
  styleUrls: ['./popup-userprofile.component.css']
})
export class PopupUserprofileComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService,private modalService: NgbModal) { }

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
       this.reset();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.reset(); 
      return 'by clicking on a backdrop';
    } else {
      this.reset(); 
      return `with: ${reason}`;
    }
  }

//to reset profile properties data
reset(){
  this.userService.otherUserEmail={
    email:''
  }
  this.userService.otherUserProfile='';
}

}
