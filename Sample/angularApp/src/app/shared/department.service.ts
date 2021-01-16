import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as moment from 'moment';

import {DEPARTMENTS} from './department.model';
import { OTHERUSERS } from './otherUsers.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  allDeps:DEPARTMENTS[]; //For get the users
  allDepsForOther:DEPARTMENTS[];//to show dep list for update other user department
  allDepUsers:OTHERUSERS[];//For get count of users in each department
  //for get dep list without current user department
  otherUserId={
    _id:''
  };
  count;//number
  constructor(private http: HttpClient,public userService: UserService) { }
//to add new department
postDepartment(depName){
    return this.http.post(environment.apiBaseUrl+'/postDep',depName);
  }
//to get department list
getDepList() {
  return this.http.get(environment.apiBaseUrl + '/getDep');
}

//to delete department
deleteDep(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/depDel/${_id}`);
}

//to get count of users in each department

countDepUsers(_id: string) {
  return this.http.get(environment.apiBaseUrl + `/getCount/${_id}`);
}

//to get departments without current department to update other user department

toUpdateOtherDepartmentList(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/getDepOther/${_id}`);
}



//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}



//to get dep list without selected user department
refreshDepsList(_id) {
  this.userService.otherUserDep._id=_id;
  //this.userService.otherUserDep.name=name;
  this.toUpdateOtherDepartmentList(_id).subscribe((res) => {
    this.allDepsForOther = res as DEPARTMENTS[];
  });
}






}
