import { Component, OnInit } from '@angular/core';
import { ARCDOCUMENTS } from 'src/app/models/archiveDoc.model';
import { DocumentService } from 'src/app/shared/document.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-archived-docs',
  templateUrl: './archived-docs.component.html',
  styleUrls: ['./archived-docs.component.css']
})
export class ArchivedDocsComponent implements OnInit {
   countArc;
   public page=1
   public pageSize=10;
   //for print
   notPrint=true;
   resetBackVici=false;
   printReadyOk=false;
  constructor(public documentService:DocumentService,public userService: UserService) { }
 
  ngOnInit(): void {
    this.refreshArcDocList();
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
  //to get arc doc list from database
  refreshArcDocList() {
    this.documentService.getArcDocs().subscribe((res) => {
      this.documentService.arcDocs = res as ARCDOCUMENTS[];
    });
    this.documentService.getCountArcDocs().subscribe((res) => {
      this.countArc= res[0];
    },err => {
      if (err.status === 404) {
        this.countArc=0;
      }
    }
    );
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



//to set _id for exp date and lock status for doc 
passFileId(_id){
  this.documentService.toPassArcId=_id;
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





}
