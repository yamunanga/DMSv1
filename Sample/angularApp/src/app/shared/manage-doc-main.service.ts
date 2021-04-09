import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ManageDocMainService {
  //For document main component
  tOfuploadDocs=false;//for document upload component to load
  tOfViewDocs=true;//for documents view component to load
  tOfViewUpload=false;//to document upload panel
  tOfViewCategoryAndSub=false;//to view manage category 
  tOfViewSubOnly=false;//to view  sub category only
  tOfViewApprovement=false;//to view manage approve
  tOfViewArchived=false;//to view/manage archived docs/files
  tofViewWorkflow=false;//to view workflow data

  constructor(public userService: UserService) { }
  
//for Document upload main component 
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
//to view manage approve
openApprovement(){
  this.reset();
  this.tOfViewApprovement=true;
}
//to view/manage archived docs/files
openArchived(){
  this.reset();
  this.tOfViewArchived=true;
}
//to view workflow data
openWorkflow(){
  this.reset();
  this.tofViewWorkflow=true;
}


//reset variables
reset(){
  this.tOfuploadDocs=false;
  this.tOfViewDocs=false;
  this.tOfViewUpload=false;
  this.tOfViewCategoryAndSub=false;
  this.tOfViewSubOnly=false;
  this.tOfViewApprovement=false;
  this.tOfViewArchived=false;
  this.tofViewWorkflow=false;
  }
//over 


}
