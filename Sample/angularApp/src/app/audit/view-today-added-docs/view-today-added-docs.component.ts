import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/shared/audit.service';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-today-added-docs',
  templateUrl: './view-today-added-docs.component.html',
  styleUrls: ['./view-today-added-docs.component.css']
})
export class ViewTodayAddedDocsComponent implements OnInit {
  
  public page=1
  public pageSize=10;
  sNameM;//Ng model for search name
  cTodayAddedDocs;
  //for print
  notPrint=true;
  resetBackVici=false;
  printReadyOk=false;
  constructor(public audit:AuditService,public userService: UserService) { }

  ngOnInit(): void {
    this.refreshTodayDocsList();
    this.getTodayDocsCount();
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
//to pass today aded docs
refreshTodayDocsList() {
  this.audit.getTodayAdedDocs().subscribe((res) => {
    this.audit.allAddedDocs = res as DOCUMENTS[];
  });
}

//to pass today aded users count
getTodayDocsCount(){
  this.audit.getTodayAdedDocsCount().subscribe((res) => {
    this.cTodayAddedDocs= res[0];
  },err=>{
    this.cTodayAddedDocs=0;
  });
 
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
onKeydown(event) {
  if (event.key === "Backspace") {
    this.ngOnInit();
  }
}
//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.audit.allAddedDocs=this.audit.allAddedDocs.filter(res=>{
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
      }else if((res.expDate!= null)&&(res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.createDate!= null)&&(res.createDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.createDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
  this.ngOnInit();
}


}


}