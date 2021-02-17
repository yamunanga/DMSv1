import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-manage-documents-main',
  templateUrl: './manage-documents-main.component.html',
  styleUrls: ['./manage-documents-main.component.css']
})
export class ManageDocumentsMainComponent implements OnInit { 

 /* tOfuploadDocs=false;//for document upload component to load
  tOfViewDocs=false;//for documents view component to load
  tOfViewUpload=true;//to document upload panel
  tOfViewCategoryAndSub=false;//to view manage category 
  tOfViewSubOnly=false;//to view  sub category only
*/

  constructor(public catService:CategoryService) { }
  ngOnInit(): void {

  }
/*
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
//to view upload panel
openUpload(){
  this.reset();
  this.tOfViewUpload=true;
}
//to view manage category
openManageCategory(){
  this.reset();
  this.tOfViewCategoryAndSub=true;
}

//to view  sub category only
openSubONly(){
  this.reset();
  this.tOfViewSubOnly=true;
}

//reset variables
reset(){
  this.tOfuploadDocs=false;
  this.tOfViewDocs=false;
  this.tOfViewUpload=false;
  this.tOfViewCategoryAndSub=false;
  this.tOfViewSubOnly=false;
  }


*/

}