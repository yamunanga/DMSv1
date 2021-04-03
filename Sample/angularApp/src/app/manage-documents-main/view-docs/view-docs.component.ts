import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

import{DOCUMENTS} from '../../shared/document.model';
import { DocumentService } from '../../shared/document.service';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.css']
})
export class ViewDocsComponent implements OnInit {
  serverErrorMessages='';
  countDocs;//for get count of docs
  role;
  constructor(public documentService:DocumentService,public userService: UserService,private toastr: ToastrService,public tempDocService:TempDocService) { }

  ngOnInit(): void {
    this.refreshDocList();
    this.getUserdetailes();
    this.getRole();
  }

  refreshDocList() {
    this.documentService.getDocs().subscribe((res) => {
      this.documentService.allDocs = res as DOCUMENTS[];
    });
    this.documentService.getCountDocs().subscribe((res) => {
      this.countDocs= res[0];
    },err => {
      if (err.status === 404) {
        this.countDocs=0;
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

//to archive doc
toArc(_id){
  if (confirm('Are you sure to Archive this record ?') == true) {
  this.documentService.setArcDoc(_id).subscribe(
    res => {
      this.toastr.success('Archive Successfull');
      this.refreshDocList();
    },
    err => {
       this.serverErrorMessages = err.error;
       this.toastr.error( this.serverErrorMessages);
    },
  );
 }
}

//to delete an file from  documents
onDel(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.documentService.deleteDoc(_id).subscribe(
    res => {
      this.toastr.success('Deleted Successful');
      this.refreshDocList();
      
    },
    err => {
      this.serverErrorMessages= err.error;
      this.toastr.error( this.serverErrorMessages);
      
    },
  );
 }
}


//to set _id for exp date and lock status for doc 
passFileId(_id){
  this.documentService.toPassDocId=_id;
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

//get user role
getRole(){
  this.role=this.userService.getRole()
}


}
