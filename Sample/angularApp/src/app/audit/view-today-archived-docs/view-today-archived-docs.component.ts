import { Component, OnInit } from '@angular/core';
import { ARCDOCUMENTS } from 'src/app/models/archiveDoc.model';
import { AuditService } from 'src/app/shared/audit.service';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-today-archived-docs',
  templateUrl: './view-today-archived-docs.component.html',
  styleUrls: ['./view-today-archived-docs.component.css']
})
export class ViewTodayArchivedDocsComponent implements OnInit {

  public page=1
  public pageSize=10;
  sNameM;//Ng model for search name
  cTodayManualArcDocs;
  constructor(public audit:AuditService,public userService: UserService) { }

  ngOnInit(): void {
    this.refreshTodayArcDocsList();
    this.getTodayArcDocsCountManual();
  }

//to pass today manual archived docs
refreshTodayArcDocsList() {
  this.audit.getTodayAdedArcDocs().subscribe((res) => {
    this.audit.allAddedArcDocs = res as ARCDOCUMENTS[];
  });
}
//to pass today manual archived docs count
getTodayArcDocsCountManual(){
  this.audit.getTodayAdedArcDocsCount().subscribe((res) => {
    this.cTodayManualArcDocs= res[0];
  },err=>{
    this.cTodayManualArcDocs=0;
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
    this.audit.allAddedArcDocs=this.audit.allAddedArcDocs.filter(res=>{
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
