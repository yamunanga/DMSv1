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
  catList:CATEGORIES[];//this is for document search drop list
  uploadPath='';//Pass current path to upload path

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
//to get categories by relevent department id ForDocSearch
getCategoriesForDocSearch(_id: string){
  return this.http.get(environment.apiBaseUrl + `/getCatsForSearch/${_id}`);
}

//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}




}
