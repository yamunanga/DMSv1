import { Component, OnInit } from '@angular/core';
import { WORKFLOWDATALiST } from 'src/app/models/workflowList.model';
import { AuditService } from 'src/app/shared/audit.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-today-new-workflows',
  templateUrl: './view-today-new-workflows.component.html',
  styleUrls: ['./view-today-new-workflows.component.css']
})
export class ViewTodayNewWorkflowsComponent implements OnInit {
  
  public page=1;
  public pageSize=10;
  sNameM;//Ng model for search name
  cTodayNewWorkDocs;
  constructor(public audit:AuditService,public userService: UserService,private workflow:WorkflowService) { }

  ngOnInit(): void {
    this.refreshTodayNewWorkDocsList();
    this.getWorkflowedDocsTodayCount();
  }

//to pass today workflowed documents
refreshTodayNewWorkDocsList() {
  this.audit.getWorkflowedDocsToday().subscribe((res) => {
    this.audit.allWorkflowToday = res as WORKFLOWDATALiST[];
  });
}
//to pass today workflowed documents count
getWorkflowedDocsTodayCount(){
  this.audit.getWorkflowedDocsTodayCount().subscribe((res) => {
    this.cTodayNewWorkDocs= res[0];
  },err=>{
    this.cTodayNewWorkDocs=0;
  });
 
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
     this.ngOnInit();
    //this.search();
    //console.log(event);
  }
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

//to get profile data from backend by user email
getOtherUserdetailesByMail(email){
  this.userService.otherUserEmail.email=email;
  this.userService.viewOtherUserProfile(this.userService.otherUserEmail).subscribe(
    res => {
      //this.userService.otherUserProfile= res['user']; 
      this.userService.otherUserProfile= res as OTHERUSERS[]; 
    }
  )
}
//this is for work flow list model
toPassListandNext(list,next,now){
  this.workflow.workflowUserList=list;
  this.workflow.workflowNext=next;
  this.workflow.workflowNow=now;
}
//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.audit.allWorkflowToday= this.audit.allWorkflowToday.filter(res=>{
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
  this.ngOnInit();
  }
}



}
