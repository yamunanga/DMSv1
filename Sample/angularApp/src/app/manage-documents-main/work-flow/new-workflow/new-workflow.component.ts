import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { DocumentService } from 'src/app/shared/document.service';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.css']
})
export class NewWorkflowComponent implements OnInit {
  role;//this is for get role
  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private toastr: ToastrService,public documentService:DocumentService,public userService: UserService,public workflow:WorkflowService,private tempDocService:TempDocService) { }

  ngOnInit(): void {
    this.refreshWorkflowData();
    this.getUserdetailes();
    this.getRole();
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

//to validate
toValidate(_id){
  if (confirm('Are you sure to validate this record ?') == true) {
    this.workflow.validateFile(_id).subscribe(
      res => {
        this.toastr.success('Validation Successful');
        this.refreshWorkflowData();
      },
      err => {
        this.serverErrorMessages =err.error;
        this.toastr.error(this.serverErrorMessages);
      },
    );
   }
}

//this is for work flow list model
toPassListandNext(list,next,now){
   this.workflow.workflowUserList=list;
   this.workflow.workflowNext=next;
   this.workflow.workflowNow=now;
}

//to set _id for exp date and lock status for doc 
passFileId(_id){
  this.workflow.passWorkflowId=_id;
}

//to pass file path
passFilePathandId(id,path){
  this.workflow.path=path;
  this.workflow.workId=id;
}

}
