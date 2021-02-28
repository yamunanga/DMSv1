import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public documentService:DocumentService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshDocList();
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










}
