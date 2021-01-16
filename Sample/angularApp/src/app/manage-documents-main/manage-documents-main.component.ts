import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-documents-main',
  templateUrl: './manage-documents-main.component.html',
  styleUrls: ['./manage-documents-main.component.css']
})
export class ManageDocumentsMainComponent implements OnInit { 

  tOfuploadDocs=true;//for document upload component to load
  tOfViewDocs=false;//for documents view component to load

  constructor() { }

  ngOnInit(): void {

  }

//to load upload component
viewUpload(){
  this.reset();
  this.tOfuploadDocs=true;
}

//to load doc view component
viewDocs(){
  this.reset();
  this.tOfViewDocs=true;
}

//reset variables
reset(){
  this.tOfuploadDocs=false;
  this.tOfViewDocs=false;
  }





}