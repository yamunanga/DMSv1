import { Component, OnInit } from '@angular/core';
import { ARCDOCUMENTS } from 'src/app/models/archiveDoc.model';
import { DocumentService } from 'src/app/shared/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-archived-docs',
  templateUrl: './archived-docs.component.html',
  styleUrls: ['./archived-docs.component.css']
})
export class ArchivedDocsComponent implements OnInit {
   countArc;
  constructor(public documentService:DocumentService) { }
 
  ngOnInit(): void {
    this.refreshArcDocList();
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









}
