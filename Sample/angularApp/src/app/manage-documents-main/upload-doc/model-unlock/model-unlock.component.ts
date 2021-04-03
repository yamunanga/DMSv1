import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { TEMPDOCUMENTS } from 'src/app/shared/tempDoc.model';
import { DocumentService } from 'src/app/shared/document.service';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
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
  constructor(public workflow:WorkflowService,private modalService: NgbModal,public tempDocService:TempDocService,public documentService:DocumentService) { }

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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetVariable();
      return 'by clicking on a backdrop';
    } else {
      this.resetVariable();
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
//testing
onSubmit(form: NgForm){
  if(this.documentService.toPassDocId==''  && this.workflow.passWorkflowId==''){
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
    )
  }else if(this.tempDocService.passFileId=='' && this.workflow.passWorkflowId==''){
    var dataModel={
      pass:this.exPass
    }
    this.documentService.tounlockDoc(this.documentService.toPassDocId,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshDocumentList();
        this.resetForm(form);
       },err => {
        this.serverErrorMessages =err.error;  
      },
    )
  }else if(this.documentService.toPassDocId=='' && this.tempDocService.passFileId==''){
    var dataModel={
      pass:this.exPass
    }
    this.workflow.tounlockWork(this.workflow.passWorkflowId,dataModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.refreshWorkflowData();
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

}
