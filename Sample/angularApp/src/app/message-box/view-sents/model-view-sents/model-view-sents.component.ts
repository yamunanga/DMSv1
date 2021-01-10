import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-model-view-sents',
  templateUrl: './model-view-sents.component.html',
  styleUrls: ['./model-view-sents.component.css']
})
export class ModelViewSentsComponent implements OnInit {
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
      //this.resetReplyModle();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      //this.getUserdetailes();
     // this.resetReplyModle();
      return 'by clicking on a backdrop';
    } else {
     // this.resetReplyModle();
      return `with: ${reason}`;
    }
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

}
