import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { ManageDocMainService } from '../shared/manage-doc-main.service';
import { UserService } from '../shared/user.service';

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
  dirName="View Documents";
  constructor(public catService:CategoryService,private userService: UserService,public manageDocMainService:ManageDocMainService) { }
  role:string;//data come from local storage
  ngOnInit(): void {
   this.getRole();
   this.dirName="View Documents";
  }
//pass name dir
passNameDir(name){
  this.dirName=name;
  return this.dirName;
}




//to get user role
getRole(){
  this.role=this.userService.getRole()
}


//all the configuration in manage document main service





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