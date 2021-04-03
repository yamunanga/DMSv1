import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-model-doc-update',
  templateUrl: './model-doc-update.component.html',
  styleUrls: ['./model-doc-update.component.css']
})
export class ModelDocUpdateComponent implements OnInit {
  
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessage1: boolean;
  serverErrorMessages1: string;
  newPath:string;//this is for upload path conversion
  workFile;//this is for uploading updated workflow file
  isClicked=false;
  workName='';//ng model for rename
  //this is for rename data
  renameData={
    _id:'',
    name:''
  }
   // ViewChild is used to access the input element. 
   @ViewChild('takeInput', {static: false}) InputVar: ElementRef;
   // this InputVar is a reference to our input. 
  constructor(private modalService: NgbModal,public workflow:WorkflowService) { }

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


//This is for select file event
selectSingleFile(event){
  if (event.target.files.length > 0) {
    this.isClicked=true;
    const file = event.target.files[0];
    this.workFile=file;
  }
}

//this is for update doc 
onSend(){
  const formData = new FormData();
  formData.append('file',this.workFile);
  formData.append('id',this.workflow.workId);
  var path=this.conPath(this.workflow.path);
  this.workflow.updateWorkDoc(path,formData).subscribe(
    res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetNativeElement();
        this.refreshWorkflowData();
        this.reset();
    },
    err => {
        this.serverErrorMessages = err.error;
      
    },
  );
}

//to rename work file
toRename(){
  this.renameData={
    _id:this.workflow.workId,
    name:this.workName
  }
  this.workflow.renameWorkFile(this.renameData).subscribe(
    res => {
        this.showSucessMessage1 = true;
        setTimeout(() => this.showSucessMessage1 = false, 4000);
        this.refreshWorkflowData();
        this.workName='';
    },
    err => {
        this.serverErrorMessages1= err.error;
      
    },
  );
}


reset(){
  this.isClicked=false;
}


//to convert  file upload location to text
conPath(path){
  var str=path.split('/');
  this.newPath=''
  for(var i=0;i<str.length;i++){
    this.newPath=this.newPath+str[i]+'-'
  }
 return this.newPath
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

//reset native element
resetNativeElement(){
  this.InputVar.nativeElement.value = ""; 
}


}
