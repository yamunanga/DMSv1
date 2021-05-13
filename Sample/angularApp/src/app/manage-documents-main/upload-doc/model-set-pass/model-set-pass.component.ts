import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { NEEDAPPROVEDOCS } from 'src/app/shared/approvementData.model';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { DocumentService } from 'src/app/shared/document.service';
import { ManageApprovementServiceService } from 'src/app/shared/manage-approvement-service.service';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { TEMPDOCUMENTS } from 'src/app/shared/tempDoc.model';
import { WorkflowService } from 'src/app/shared/workflow.service';

@Component({
  selector: 'app-model-set-pass',
  templateUrl: './model-set-pass.component.html',
  styleUrls: ['./model-set-pass.component.css']
})
export class ModelSetPassComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  newPassword;//ng model 
  confirmPassword;//ng model 
  constructor(public manageApprovment:ManageApprovementServiceService,private modalService: NgbModal,public tempDocService:TempDocService,public documentService:DocumentService,public workflow:WorkflowService) { }
  
  ngOnInit(): void {
    this.resetValues();
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
      this.resetValues();
      this.resetVariable();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetValues();
      this.resetVariable();
      return 'by clicking on a backdrop';
    } else {
      this.resetValues();
      this.resetVariable();
      return `with: ${reason}`;
    }
}
  

onSubmitN() {
  if(this.newPassword==this.confirmPassword){
  var dataModel={
    pass:this.confirmPassword
  }
  this.tempDocService.setTlock(this.tempDocService.passFileId,dataModel).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.resetValues();
      this.refreshTempDocList();
      
    },
    err => {
      this.serverErrorMessages=err.error;
      
    },
  );
}else{
 this.serverErrorMessages = 'Password Not Match Enter Again';
} 
}

//to lock file
onSubmit(){
  if(this.documentService.toPassDocId==='empty' && this.workflow.passWorkflowId==='empty' && this.manageApprovment.toPassDocIdApr==='empty' && this.tempDocService.passFileId !='empty'){
    if(this.newPassword==this.confirmPassword){
      var dataModel={
        pass:this.confirmPassword
      }
      this.tempDocService.setTlock(this.tempDocService.passFileId,dataModel).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetValues();
          this.refreshTempDocList();
          this.refreshWorkflowDataProcess();
          this.refreshOldWorkflowDataProcess();
          this.resetVariable();
          
        },
        err => {
          this.serverErrorMessages=err.error;
          
        },
      );
    }else{
     this.serverErrorMessages = 'Password Not Match Enter Again';
    } 
  }else if(this.tempDocService.passFileId==='empty' && this.workflow.passWorkflowId==='empty' && this.manageApprovment.toPassDocIdApr==='empty' && this.documentService.toPassDocId !='empty'){
    if(this.newPassword==this.confirmPassword){
      var dataModel={
        pass:this.confirmPassword
      }
      this.documentService.setlockDoc(this.documentService.toPassDocId,dataModel).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetValues();
          this.refreshDocumentList();
          this.refreshWorkflowDataProcess();
          this.refreshOldWorkflowDataProcess();
          this.resetVariable();
        },
        err => {
          this.serverErrorMessages=err.error;
          
        },
      );
    }else{
     this.serverErrorMessages = 'Password Not Match Enter Again';
    } 
  }else if(this.documentService.toPassDocId==='empty' && this.tempDocService.passFileId==='empty' && this.manageApprovment.toPassDocIdApr==='empty' && this.workflow.passWorkflowId !='empty'){
    if(this.newPassword==this.confirmPassword){
      var dataModel={
        pass:this.confirmPassword
      }
      this.workflow.setlockWork(this.workflow.passWorkflowId,dataModel).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetValues();
          this.refreshWorkflowData();
          this.refreshWorkflowDataProcess();
          this.refreshOldWorkflowDataProcess();
          this.resetVariable();
        },
        err => {
          this.serverErrorMessages=err.error;
          
        },
      );
    }else{
     this.serverErrorMessages = 'Password Not Match Enter Again';
    } 
  }else if(this.documentService.toPassDocId==='empty' && this.tempDocService.passFileId==='empty' && this.workflow.passWorkflowId==='empty' && this.manageApprovment.toPassDocIdApr !='empty'){
    if(this.newPassword==this.confirmPassword){
      var dataModel={
        pass:this.confirmPassword
      }
      this.manageApprovment.setlockApr(this.manageApprovment.toPassDocIdApr,dataModel).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetValues();
          this.refreshNeedApprovementList();
          this.resetVariable();
        },
        err => {
          this.serverErrorMessages=err.error;
          
        },
      );
    }else{
     this.serverErrorMessages = 'Password Not Match Enter Again';
    } 
  }
}




resetVariable(){
  this.documentService.toPassDocId='empty';
  this.tempDocService.passFileId='empty';
  this.workflow.passWorkflowId='empty';
  this.manageApprovment.toPassDocIdApr='empty';
}



resetValues(){
  this.newPassword='';
  this.confirmPassword='';
  this.serverErrorMessages = '';
}

//to get temp documents
refreshTempDocList() {
  this.tempDocService.getTempDocs().subscribe((res) => {
    this.tempDocService.allDocsById = res as TEMPDOCUMENTS[];
  });
}

//refresh document list
refreshDocumentList(){
  this.documentService.getDocs().subscribe((res) => {
    this.documentService.allDocs = res as DOCUMENTS[];
  });
}

//to get workflow data list acording to user req id
refreshWorkflowData() {
  this.workflow.getWorkflowDataList().subscribe((res) => {
    this.workflow.workflowDataList = res as WORKFLOWDATALiST[];
  });
 this.workflow.getWorkflowDataListCount().subscribe((res) => {
    this.workflow.workflowDataCount= res[0];
  });
}


//to get workflow processing data list acording to user req id
refreshWorkflowDataProcess() {
  this.workflow.getWorkflowDataNow().subscribe((res) => {
    this.workflow.workflowProcessing = res as WORKFLOWDATALiST[];
  });
  this.workflow.getWorkflowDataNowCount().subscribe((res) => {
    this.workflow.workflowProcessingC= res[0];
  });
}

//this is for get need approvement data
refreshNeedApprovementList() {
  this.manageApprovment.toGetApprovementData().subscribe((res) => {
    this.manageApprovment.approveData = res as NEEDAPPROVEDOCS[];
  });
  this.manageApprovment.toGetApprovementDataCount().subscribe((res) => {
    this.manageApprovment.approveDataCount = res[0];
  });
}
//to get workflow processing data list acording to user req id
refreshOldWorkflowDataProcess() {
  this.workflow.getWorkflowDoneFiles().subscribe((res) => {
    this.workflow.workflowOldList = res as DOCUMENTS[];
  });
  this.workflow.getWorkflowDoneFilesCount().subscribe((res) => {
    this.workflow.workflowOldDataCount= res[0];
  },err => { 
    this.workflow.workflowOldDataCount=0;
    
  }
  );
}




}


  
