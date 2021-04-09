import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageServiceService } from 'src/app/shared/message-service.service';

@Component({
  selector: 'app-model-sent-msg',
  templateUrl: './model-sent-msg.component.html',
  styleUrls: ['./model-sent-msg.component.css']
})
export class ModelSentMsgComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  multipleFiles = []; //This is for multiple attachments
  constructor(private modalService: NgbModal,public messageService: MessageServiceService) { }

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


//This is for select file event
selectMultipleFiles(event){
  if (event.target.files.length > 0) {
    this.multipleFiles = event.target.files;
  }
}

//for post msg with attachments--used---
onSend(){
  if(this.messageService.toId=='' && this.messageService.toEmail !=''){
    const formData = new FormData();
    formData.append('toEmail',this.messageService.toEmail);
    //console.log(formData.get('toEmail'));
    formData.append('msgBody',this.messageService.msgBody);
    //console.log(formData.get('msgBody'));
    for(let file of this.multipleFiles){
      formData.append('files',file);
    }
    this.messageService.postMsgForEmail(formData).subscribe(
      res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetMsg();
          
      },
      err => {
          this.serverErrorMessages = err.error;
        
      },
    );
  }else if((this.messageService.toEmail=='' && this.messageService.toId !='')){
    const formData = new FormData();
    formData.append('toId',this.messageService.toId);
    //console.log(formData.get('toEmail'));
    formData.append('msgBody',this.messageService.msgBody);
    //console.log(formData.get('msgBody'));
    for(let file of this.multipleFiles){
      formData.append('files',file);
    }
    this.messageService.postMsgForId(formData).subscribe(
      res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetMsg();
          
      },
      err => {
          this.serverErrorMessages = err.error;
        
      },
    );
  }
  
}


resetMsg(){
  this.messageService.msgBody='';
}


}
