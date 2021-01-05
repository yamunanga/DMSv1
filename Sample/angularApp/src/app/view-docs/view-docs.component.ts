import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import{DOCUMENTS} from '../shared/document.model';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.css']
})
export class ViewDocsComponent implements OnInit {

  constructor(public documentService:DocumentService) { }

  ngOnInit(): void {
    this.refreshDocList();
  }

  refreshDocList() {
    this.documentService.getDocs().subscribe((res) => {
      this.documentService.allDocs = res as DOCUMENTS[];
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











}
