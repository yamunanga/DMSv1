import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WORKFLOWDATA } from 'src/app/models/workFlow.model';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-processing-now',
  templateUrl: './processing-now.component.html',
  styleUrls: ['./processing-now.component.css']
})
export class ProcessingNowComponent implements OnInit {
  role;//this is for get role
  serverErrorMessages: string;
  sNameM;//Ng model for search name
  public page=1
  public pageSize=10;
   //for print
   notPrint=true;
   resetBackVici=false;
   printReadyOk=false;
  constructor(private tempDocService:TempDocService,private messageService: MessageServiceService,public userService: UserService,public workflow:WorkflowService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshWorkflowDataProcess();
    this.getRole();
    //for print
    this.notPrint=true;
    this.resetBackVici=false;
    this.printReadyOk=false;
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
//to pass workflow now user email
toPassToEmail(mail){
  this.messageService.toEmail=mail;
}
//to get profile data from backend by user email
getOtherUserdetailesByMail(email){
  this.userService.otherUserEmail.email=email;
  this.userService.viewOtherUserProfile(this.userService.otherUserEmail).subscribe(
    res => {
      //this.userService.otherUserProfile= res['user']; 
      this.userService.otherUserProfile= res as OTHERUSERS[]; 
    },
    err => { 
      //console.log(err);
      this.toastr.error(err);
      
    }
  )
}

//to delete workflow
delWorkflow(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
    this.workflow.delWorkflow(_id).subscribe(
      res => {
        this.toastr.success('Deleted Successful');
        this.refreshWorkflowDataProcess();
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

//to set _id for exp date,lock status and workflow data for doc 
passFileIdForWorkflow(_id){
  this.workflow.passWorkProcessId=_id;
}

toGetWorkflowArrayInWork(_id){
  this.workflow.getWorkflowDataInWork(_id).subscribe((res) => {
    this.workflow.workflowArr= res as WORKFLOWDATA[];
  });
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
   this.refreshWorkflowDataProcess()
    //this.search();
    //console.log(event);
  }
}
//to get workflow processing data list acording to user req id
refreshWorkflowDataProcess() {
  this.workflow.getWorkflowDataNow().subscribe((res) => {
    this.workflow.workflowProcessing = res as WORKFLOWDATALiST[];
  });
  this.workflow.getWorkflowDataNowCount().subscribe((res) => {
    this.workflow.workflowProcessingC= res[0];
  },err => { 
    this.workflow.workflowProcessingC=0;
    
  }
  );
}
//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.workflow.workflowProcessing= this.workflow.workflowProcessing.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var createdAt=this.userService.getDate(res.createdAt);
      var updatedAt=this.userService.getDate(res.updatedAt);
      //var expDate=this.userService.getDate(res.expDate);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.category != null)&&(res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res. department != null)&&(res. department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( createdAt != null)&&( createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( updatedAt != null)&&(  updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return    updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.type != null)&&(res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.createdBy != null)&&(res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.expDate!= null)&&(res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
  this.refreshWorkflowDataProcess();
  }
}



}
