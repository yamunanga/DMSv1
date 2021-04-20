import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { DocumentService } from 'src/app/shared/document.service';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
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
  sNameM;//Ng model for search name
  showSucessMessage: boolean;
  serverErrorMessages: string;
  public page=1
  public pageSize=10;
  constructor(private messageService: MessageServiceService,private toastr: ToastrService,public documentService:DocumentService,public userService: UserService,public workflow:WorkflowService,private tempDocService:TempDocService) { }

  ngOnInit(): void {
    this.refreshWorkflowData();
    this.getUserdetailes();
    this.getRole();
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

//to pass workflow next email
toPassToEmail(mail){
  this.messageService.toEmail=mail;
}

//to pass workflow createdby id
toPassToId(id){
  this.messageService.toId=id;
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

//to get profile data from backend by user id
getOtherUserdetailesById(id){
  this.userService.findUserProfilebyId(id).subscribe(
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

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.refreshWorkflowData();
    //this.search();
    //console.log(event);
  }
}
//to get workflow data list acording to user req id
refreshWorkflowData() {
  this.workflow.getWorkflowDataList().subscribe((res) => {
    this.workflow.workflowDataList = res as WORKFLOWDATALiST[];
  });
  this.workflow.getWorkflowDataListCount().subscribe((res) => {
    this.workflow.workflowDataCount= res[0];
  },err => { 
    this.workflow.workflowDataCount=0;
    
  });
}
//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.workflow.workflowDataList= this.workflow.workflowDataList.filter(res=>{
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
  this.refreshWorkflowData();
  }
}

}
