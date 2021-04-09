import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { TEMPDOCUMENTS } from 'src/app/shared/tempDoc.model';
import { DocumentService } from 'src/app/shared/document.service';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { ManageApprovementServiceService } from 'src/app/shared/manage-approvement-service.service';
import { NEEDAPPROVEDOCS } from 'src/app/shared/approvementData.model';
@Component({
  selector: 'app-model-unlock',
  templateUrl: './model-unlock.component.html',
  styleUrls: ['./model-unlock.component.css']
})
export class ModelUnlockComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  exPass;//ng model
  constructor(public manageApprovment:ManageApprovementServiceService,public workflow:WorkflowService,private modalService: NgbModal,public tempDocService:TempDocService,public documentService:DocumentService) { }

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
      this.resetVariable();
      this.resetValues();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetVariable();
      this.resetValues();
      return 'by clicking on a backdrop';
    } else {
      this.resetVariable();
      this.resetValues();
      return `with: ${reason}`;
    }
}

onSubmitn(form: NgForm) {
  //console.log(form.value);
  var dataModel={
    pass:this.exPass
  }
  this.tempDocService.tounlockT(this.tempDocService.passFileId,dataModel).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.refreshTempDocList();
      this.resetForm(form);
     },err => {
      this.serverErrorMessages =err.error;  
    },
  );
}
//using
onSubmit(form: NgForm){
  if(this.documentService.toPassDocId===''  && this.workflow.passWorkflowId==='' && this.manageApprovment.toPassDocIdApr==='' && this.tempDocService.passFileId !=''){
    var dataModel={
      pass:this.exPass
    }
    this.tempDocService.tounlockT(this.tempDocService.passFileId,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshTempDocList();
        this.refreshWorkflowDataProcess();
        this.refreshOldWorkflowDataProcess();
        this.resetForm(form);
       },err => {
        this.serverErrorMessages =err.error;  
      },
    )
  }else if(this.tempDocService.passFileId==='' && this.workflow.passWorkflowId==='' && this.manageApprovment.toPassDocIdApr==='' && this.documentService.toPassDocId !=''){
    var dataModel={
      pass:this.exPass
    }
    this.documentService.tounlockDoc(this.documentService.toPassDocId,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshWorkflowDataProcess();
        this.refreshDocumentList();
        this.refreshOldWorkflowDataProcess();
        this.resetForm(form);
       },err => {
        this.serverErrorMessages =err.error;  
      },
    )
  }else if(this.documentService.toPassDocId==='' && this.tempDocService.passFileId==='' && this.manageApprovment.toPassDocIdApr==='' &&this.workflow.passWorkflowId !=''){
    var dataModel={
      pass:this.exPass
    }
    this.workflow.tounlockWork(this.workflow.passWorkflowId,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshWorkflowDataProcess();
        this.refreshWorkflowData();
        this.refreshOldWorkflowDataProcess();
        this.resetForm(form);
        
       },err => {
        this.serverErrorMessages =err.error;  
      },
    )
  }else if(this.documentService.toPassDocId==='' && this.tempDocService.passFileId==='' && this.workflow.passWorkflowId==='' && this.manageApprovment.toPassDocIdApr !=''){
    var dataModel={
      pass:this.exPass
    }
    this.manageApprovment.unlockApr(this.manageApprovment.toPassDocIdApr,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshNeedApprovementList();
        this.resetForm(form);
        
       },err => {
        this.serverErrorMessages =err.error;  
      },
    )
  }
}


resetForm(form: NgForm) {
  form.resetForm();
  this.resetValues();
}
resetValues(){
  this.serverErrorMessages = '';
  this.exPass='';
}

resetVariable(){
  this.documentService.toPassDocId='';
  this.tempDocService.passFileId='';
  this.workflow.passWorkflowId='';
  this.manageApprovment.toPassDocIdApr='';
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

//this is for get need approvement data
refreshNeedApprovementList() {
  this.manageApprovment.toGetApprovementData().subscribe((res) => {
    this.manageApprovment.approveData = res as NEEDAPPROVEDOCS[];
  });
  this.manageApprovment.toGetApprovementDataCount().subscribe((res) => {
    this.manageApprovment.approveDataCount = res[0];
  });
}


}
