import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.css']
})
export class ModelViewComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  multipleFiles = []; //This is for multiple attachments
  // ViewChild is used to access the input element. 
  @ViewChild('takeInput', {static: false}) 
  // this InputVar is a reference to our input. 
  InputVar: ElementRef; 
  
  constructor(private modalService: NgbModal,private http: HttpClient,public messageService: MessageServiceService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serverErrorMessages="";
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

//to sent the reply--not Used---
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
//to reset file array
resetFarr(){
  this.multipleFiles=[];
}

//to get the file
getLink(url){
  var ul=environment.apiDownloadUrl+'/'+url;
  return ul
}
//Split for get file name
splitName(name){
  var str =name; 
  var splitted = str.split("-")[1];
  //console.log(splitted);
  return splitted;
}



//for post msg with attachments--used---
onSend(){
  const formData = new FormData();
  formData.append('fromEmail',this.messageService.replyModel.fromEmail);
  //console.log(formData.get('fromEmail'));
  formData.append('toEmail',this.messageService.replyModel.toEmail);
  //console.log(formData.get('toEmail'));
  formData.append('msgBody',this.messageService.replyModel.msgBody);
  //console.log(formData.get('msgBody'));
  for(let file of this.multipleFiles){
    formData.append('files',file);
  }
  this.http.post<any>(environment.apiBaseUrl+'/postFiles', formData,{
    reportProgress: true,
  }).subscribe(
    (res) => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      
    },
    (err) =>{
      this.serverErrorMessages = err.error.join('<br/>');
    }
  );
  
}
resetButton(){
  this.ngOnInit();
  this.inputReset();
  this.resetReplyModle();
  this.resetFarr();
}

//input reset
inputReset(){
  // We will clear the value of the input  
    // field using the reference variable.
    this.InputVar.nativeElement.value = "";
 }

//This is for select file event
selectMultipleFiles(event){
  if (event.target.files.length > 0) {
    this.multipleFiles = event.target.files;
  }
}

}
