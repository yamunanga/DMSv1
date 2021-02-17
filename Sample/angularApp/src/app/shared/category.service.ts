import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { CATEGORIES } from './category.model';
import { SUBCATEGORIES } from './subCategory.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  allCatsById:CATEGORIES[]; //For get the categories by department id 
  allScatsById:SUBCATEGORIES[];//for get the subcategories by main cat id
  allSScatsById:SUBCATEGORIES[];//for get the subcategories inside another sub category
  currentPath:String;//Pass current path for upload location
  uploadPath='';//Pass current path to upload path
//For document main component
  tOfuploadDocs=false;//for document upload component to load
  tOfViewDocs=false;//for documents view component to load
  tOfViewUpload=true;//to document upload panel
  tOfViewCategoryAndSub=false;//to view manage category 
  tOfViewSubOnly=false;//to view  sub category only

  constructor(private http: HttpClient,public userService: UserService) { }

//to create new category
  postCategory(data){
    return this.http.post(environment.apiBaseUrl+'/postCategory',data);
  }

//to get categories by department id
toGetAllCatsById(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getCats/${_id}`);
}

//to get count of categories of relevent dep 
toGetAllCatCount(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getCatCount/${_id}`);
}

//to delete category
deleteCat(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/delCategory/${_id}`);
}

//create new sub category
postSubCategory(data){
  return this.http.post(environment.apiBaseUrl+'/postSubCategory',data);
}
//to get  sub categories by relevent category id
toGetAllScatsById(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getsCats/${_id}`);
}

//for get the subcategories inside another sub category
toGetAllSScatsById(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getSSCat/${_id}`);
}

//to delete sub category 
deleteSubCat(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/delsubCategory/${_id}`);
}

// to get subcategory count by catId getSubCategoriesCount
getSubCount(_id: string){
  return this.http.get(environment.apiBaseUrl + `/getSubCategoriesCount/${_id}`);
}
//to get subcategory count inside of another sub category 
getSubSubCount(_id: string){
  return this.http.get(environment.apiBaseUrl + `/getSubSubCategoriesCount/${_id}`);
}


//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}



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

//reset variables
reset(){
  this.tOfuploadDocs=false;
  this.tOfViewDocs=false;
  this.tOfViewUpload=false;
  this.tOfViewCategoryAndSub=false;
  this.tOfViewSubOnly=false;
  }
//over 


}
