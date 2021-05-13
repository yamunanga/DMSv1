import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NEEDAPPROVEDOCS } from 'src/app/shared/approvementData.model';
import { DocumentService } from 'src/app/shared/document.service';
import { ManageApprovementServiceService } from 'src/app/shared/manage-approvement-service.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-manage-approvement',
  templateUrl: './manage-approvement.component.html',
  styleUrls: ['./manage-approvement.component.css']
})
export class ManageApprovementComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;
  role;
  public page=1
  public pageSize=10;
   //for print
   notPrint=true;
   resetBackVici=false;
   printReadyOk=false;
  constructor(public tempDocService:TempDocService,public documentService:DocumentService,public workflow:WorkflowService,public manageApprovment:ManageApprovementServiceService,public userService: UserService,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.refreshNeedApprovementList();
    this.getUserdetailes();
    this.getRole();
    //for print
    this.notPrint=true;
    this.resetBackVici=false;
    this.printReadyOk=false;
    this.resetVariable();
  }
  resetVariable(){
    this.documentService.toPassDocId='empty';
    this.tempDocService.passFileId='empty';
    this.workflow.passWorkflowId='empty';
    //this.manageApprovment.toPassDocIdApr='empty';
  }
//this is for print ready
printReady(){
  this.notPrint=false;
  this.printReadyOk=true;
  this.resetBackVici=true;
}

//this is for reset back to original
resetBack(){
  this.notPrint=true;
  this.printReadyOk=false;
  this.resetBackVici=false;
}
  //this is for get need approvement data
  refreshNeedApprovementList() {
    this.manageApprovment.toGetApprovementData().subscribe((res) => {
      this.manageApprovment.approveData = res as NEEDAPPROVEDOCS[];
    });
    this.manageApprovment.toGetApprovementDataCount().subscribe((res) => {
      this.manageApprovment.approveDataCount = res[0];
      //console.log(this.manageApprovment.approveDataCount);
    });
  }

 //to get the doc
 getLink(url){
  var ul=environment.apiDownloadUrl+'/'+url
  return ul
}

//to convert bytes to mega bytes
byteToMb(byte){
  var flt= parseFloat(byte);
  var mb=flt/1024/1024
  return mb.toFixed(2);
}

getUserEmail(_id){
  this.userService.getUserDetailesById(_id).subscribe((res) => {
    this.userService.otherUserProfile=res as OTHERUSERS[];
  });
}


//to approve doc
toAccept(_id) {
  if (confirm('Are you sure to Approve this File ?') == true) {
      this.manageApprovment.toAccept(_id).subscribe(
      res => {
        this.toastr.success('File Approved!');
        this.refreshNeedApprovementList();
      },
      err => {
        if (err.status === 404) {
          this.serverErrorMessages = err.error.join('<br/>');
          this.toastr.error(this.serverErrorMessages);
        }
        else if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
          this.toastr.error(this.serverErrorMessages);
        }
        else if(err.status === 401){
          this.serverErrorMessages = err.error.join('<br/>');
          this.toastr.error(this.serverErrorMessages);
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        
      },
    );
  }
}
//to pass doc id for reject
passReject(_id){
  this.manageApprovment.rejectDocId=_id;
}

//get user role
getRole(){
  this.role=this.userService.getRole()
}

//get user detailes
getUserdetailes(){
  this.userService.getUserProfile().subscribe(
    res => {
       this.userService.userDetails = res['user'];
    },
    err => { 
      //console.log(err);
      
    }
  )
}

//to set _id for exp date and lock status for doc 
passFileId(_id){
  this.manageApprovment.toPassDocIdApr=_id;
}



}
