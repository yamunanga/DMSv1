import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NEEDAPPROVEDOCS } from 'src/app/shared/approvementData.model';
import { ManageApprovementServiceService } from 'src/app/shared/manage-approvement-service.service';

@Component({
  selector: 'app-reject-popup-model',
  templateUrl: './reject-popup-model.component.html',
  styleUrls: ['./reject-popup-model.component.css']
})
export class RejectPopupModelComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private modalService: NgbModal,public manageApprovment:ManageApprovementServiceService) { }
 //data model for pass reject reason
 rejectData={
   msg:''
 }
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
      this.resetReject();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetReject();
      return 'by clicking on a backdrop';
    } else {
      this.resetReject();
      return `with: ${reason}`;
    }
  }



//to reject doc
toReject() {
  if (confirm('Are you sure to Reject this File ?') == true) {
      this.manageApprovment.toReject(this.manageApprovment.rejectDocId,this.rejectData).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this. refreshNeedApprovementList();
        this.resetReject();
      },
      err => {
        if (err.status === 404) {
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
}


//reset model data
resetReject(){
  this.rejectData={
    msg:''
  }
  this.manageApprovment.rejectDocId='';
}





  //this is for get need approvement data
  refreshNeedApprovementList() {
    this.manageApprovment.toGetApprovementData().subscribe((res) => {
      this.manageApprovment.approveData = res as NEEDAPPROVEDOCS[];
    });
    this.manageApprovment.toGetApprovementDataCount().subscribe((res) => {
      this.manageApprovment.approveDataCount = res[0];
      console.log(this.manageApprovment.approveDataCount);
    });
  }









}
