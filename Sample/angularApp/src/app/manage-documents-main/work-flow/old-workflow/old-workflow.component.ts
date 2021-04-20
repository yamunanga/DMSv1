import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { DocumentService } from 'src/app/shared/document.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-old-workflow',
  templateUrl: './old-workflow.component.html',
  styleUrls: ['./old-workflow.component.css']
})
export class OldWorkflowComponent implements OnInit {
  role;
  sNameM;//Ng model for search name
  serverErrorMessages: string;
  public page=1
  public pageSize=10;
  constructor(private documentService:DocumentService,public userService: UserService,public workflow:WorkflowService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshOldWorkflowDataProcess();
    this.getUserdetailes();
    this.getRole();
  }



//to delete workflow done
delWorkflowDone(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
    this.workflow.getWorkflowDoneFileDel(_id).subscribe(
      res => {
        this.toastr.success('Deleted Successful');
        this.refreshOldWorkflowDataProcess();
      },
      err => {
        this.serverErrorMessages =err.error;
        this.toastr.error(this.serverErrorMessages);
      },
    );
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



//get user role
getRole(){
  this.role=this.userService.getRole()
}

//this is for work flow list model
toPassListandNext(list){
  this.workflow.workflowOldUsers=list;
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
  this.documentService.toPassDocId=_id;
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.refreshOldWorkflowDataProcess();
    //this.search();
    //console.log(event);
  }
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
//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.workflow.workflowOldList= this.workflow.workflowOldList.filter(res=>{
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
   this.refreshOldWorkflowDataProcess();
  }
}
}
