import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from 'src/app/shared/message-service.service';
@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.css']
})
export class ModelViewComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  
  constructor(private modalService: NgbModal,public messageService: MessageServiceService,private toastr: ToastrService) { }

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
      this.resetReplyModle();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      //this.getUserdetailes();
      this.resetReplyModle();
      return 'by clicking on a backdrop';
    } else {
      this.resetReplyModle();
      return `with: ${reason}`;
    }
  }

//to sent the reply
sentReply(){
  this.messageService.postMsg(this.messageService.replyModel).subscribe((res) => {
    //this.toastr.success('Message Send !');
    this.showSucessMessage = true;
    setTimeout(() => this.showSucessMessage = false, 4000);
    this.ngOnInit();
    this.resetReplyModle();
  }, err => {
    if (err.status === 404) {
     // this.serverErrorMessages = err.error.join('<br/>');
     this.serverErrorMessages = 'User Not Found !'
    }
    else if (err.status === 422) {
      //this.serverErrorMessages = err.error.join('<br/>');
      this.serverErrorMessages = 'Sent failed !'
    }
    else
     //this.serverErrorMessages = err.error.join('<br/>');
     this.serverErrorMessages = 'Something Went Wrong !'
   }
 );
}

//To reset message reply model 
resetReplyModle(){
  this.messageService.replyModel={
    fromEmail:'',
    toEmail:'',
    msgBody:''
  }
}


}
