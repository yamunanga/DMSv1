import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import {POSITIONS} from './position.model';
import { OTHERUSERS } from './otherUsers.model';

import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  allPositions:POSITIONS[]; //For get the list
  allPositionsOther:POSITIONS[];//for get update other user position
  count;//for get the count of users in each designation
 
  constructor(private http: HttpClient,public userService: UserService) { }


//to add new designation
postDesignation(degName){
  return this.http.post(environment.apiBaseUrl+'/postDesignation',degName);
}


//to get designation list
getDesigList() {
  return this.http.get(environment.apiBaseUrl + '/getDesignations');
}

//to delete designation
deleteDesignation(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/designationDel/${_id}`);
}

//to get count of users in each designation

countUsersInDesig(_id: string) {
  return this.http.get(environment.apiBaseUrl + `/getCountDesig/${_id}`);
}

//to get positions without current position to update other user position

toUpdateOtherPositionList(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getPositionOther/${_id}`);
}



//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}



//to get position list without selected user position
refreshPostList(_id) {
  this.userService.otherUserPost._id=_id;
  //this.userService.otherUserDep.name=name;
  this.toUpdateOtherPositionList(_id).subscribe((res) => {
    this.allPositionsOther = res as POSITIONS[];
  });
}







}
