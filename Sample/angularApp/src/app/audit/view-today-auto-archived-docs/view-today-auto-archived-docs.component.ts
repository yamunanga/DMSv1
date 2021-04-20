import { Component, OnInit } from '@angular/core';
import { ARCDOCUMENTS } from 'src/app/models/archiveDoc.model';
import { AuditService } from 'src/app/shared/audit.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-today-auto-archived-docs',
  templateUrl: './view-today-auto-archived-docs.component.html',
  styleUrls: ['./view-today-auto-archived-docs.component.css']
})
export class ViewTodayAutoArchivedDocsComponent implements OnInit {
 
  public page=1
  public pageSize=10;
  sNameM;//Ng model for search name
  cTodayAutoArcDocs;
  constructor(public audit:AuditService,public userService: UserService) { }
 
  ngOnInit(): void {
    this.refreshTodayArcManualDocsList();
    this.getTodayAutoArcDocsCountManual();

  }

//to pass today automatic archived docs
refreshTodayArcManualDocsList() {
    this.audit.getTodayAutoArcDocs().subscribe((res) => {
      this.audit.allAddedAutoArcDocs = res as ARCDOCUMENTS[];
    });
  }
//to pass today automatic archived docs count
getTodayAutoArcDocsCountManual(){
  this.audit.getTodayAutoArcDocsCount().subscribe((res) => {
    this.cTodayAutoArcDocs= res[0];
  },err=>{
    this.cTodayAutoArcDocs=0;
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

//to get profile data from backend by user id
getOtherUserdetailesById(id){
  this.userService.findUserProfilebyId(id).subscribe(
    res => {
      //this.userService.otherUserProfile= res['user']; 
      this.userService.otherUserProfile= res as OTHERUSERS[]; 
    }
  )
}

onKeydown(event) {
  if (event.key === "Backspace") {
    this.ngOnInit();
  }
}

//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.audit.allAddedAutoArcDocs=this.audit.allAddedAutoArcDocs.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var createdAt=this.userService.getDate(res.createdAt);
      var updatedAt=this.userService.getDate(res.updatedAt);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.category != null)&&(res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.department != null)&&(res. department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( createdAt != null)&&( createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( updatedAt != null)&&(  updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return    updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.type != null)&&(res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.createdBy != null)&&(res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
      else if((res.arcBy!= null)&&(res.arcBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.arcBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
  this.ngOnInit();
}


 }
}
