import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import * as moment from 'moment';

import { User } from '../models/user.model';
import { Email} from './email.model';
import { RESETPASS } from './resetPassword.model';
import { OTHERUSERS } from './otherUsers.model';
import { OtherUserRole } from './otherUserRole.model';
import { ARCHIVEDUSERS } from './archivedUsers.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  selectedUser: User = {
   // userName:'',
    fullName: '',
    email: '',
    password: '',
    role:'', //to fetch role info
    department:'',
    position:''
  };
   activationToken:Email={
     token:'',
   };
   resetPassData:RESETPASS={
     resetLink:'',
     newPass:'',
   };
   //This is for user status
   userStatus={
    status:'',
   }
   //This is for other user role update via user list
   userData:OtherUserRole={
     _id:'',
     role:''
   }
   
   allUsers:OTHERUSERS[]; //For get the users
   allArchivedUsers:ARCHIVEDUSERS[];//For get the archived users
   userDetails;
   otherUserProfile:OTHERUSERS[];//for the popup profile
   arcUserCout=0;//to get arc user count
   //for pass to other user email to backend
   otherUserEmail={
     email:''
   };
   //for pass to other user id to backend
   otherUserId='';
   //to update other user department
   otherUserDep={
     _id:'',
     name:''
   }
   //to update other user position
   otherUserPost={
     _id:'',
     name:''
   }
   userInfo;
   otherUserRole;//this for get current user role from userList
   //otherUserId;//this is for get userId from userList
   otherUserData;//to get other user email by id
   userInfoWork;//to user department
   userDesig;//to user designation
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  localTimeService: string;
  otherUserCount=0;//to get count of users
  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/reguser',user);//if you want to use no auth (,this.noAuthHeader)
  }
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  //Test
  getUserInfo() {
    return this.http.get(environment.apiBaseUrl + '/userInfo');
  }
  getRoleInfo(){
    return this.http.get(environment.apiBaseUrl + '/findUser');
  }
  activateUserAccount(activateToken:Email){
    return this.http.post(environment.apiBaseUrl+'/emailActivate',activateToken);
  }
  //To forget User Password
  forgetPassword( userReqEmail){
    return this.http.put(environment.apiBaseUrl+'/forgot-password',userReqEmail);
  }
  //To reset password
  resetPassword(resetPassData:RESETPASS){
    return this.http.put(environment.apiBaseUrl+'/reset-password',resetPassData);
  }
  //To update User full name 

  updateInfo(modelData){
  return this.http.put(environment.apiBaseUrl+'/updateInfo',modelData);
  }
  //To update user Passwrd via User Profile
  updatePass( modelPassword){
    return this.http.put(environment.apiBaseUrl+'/updatePass',modelPassword);
  }
  
  //To update user Role Via User Profile
  updateUserRole( modelRole){
    return this.http.put(environment.apiBaseUrl+'/updateUserRole',modelRole);
  } 
  //To get all users 
  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/getUsers');
  }
  //To get all users count
  getAllUsersCount() {
    return this.http.get(environment.apiBaseUrl + '/getUsersCount');
  }
  //To update last active data
  updateUserLastActive(lastData){
    return this.http.put(environment.apiBaseUrl+'/updateUserLastActive',lastData);
  } 
  //To update user status
  updateUserStatus(statusData){
    return this.http.put(environment.apiBaseUrl+'/updateUserStatus',statusData);
  } 
  //To remove user from userList
  deleteUser(idmodel){
    return this.http.put(environment.apiBaseUrl+'/deleteUser',idmodel);
  } 
  //To update user role via userList
  updateOtherUserRole( userData:OtherUserRole){
    return this.http.put(environment.apiBaseUrl+'/updateOtherUserRole',userData);
  } 
 //To view user profile for other Users
 viewOtherUserProfile(data){
  return this.http.put(environment.apiBaseUrl+'/findUserProfile',data);
} 

//To change other user department
changeOtherUserDepartment(data){
  return this.http.put(environment.apiBaseUrl+'/changeDep',data);
} 

//to change current user department
changeUserDepartment(data){
  return this.http.put(environment.apiBaseUrl+'/changeDepCurrent',data);
} 
//To change other user position/designation

changeOtherUserPosition(data){
  return this.http.put(environment.apiBaseUrl+'/changePosition',data);
} 

//To change current user position
changeUserPosition(data){
  return this.http.put(environment.apiBaseUrl+'/changePositionCurrent',data);
} 
//to send department by user email
getUserDepByMail(data) {
  return this.http.put(environment.apiBaseUrl + `/getUserDepByMail`,data);
}
//to send designation by user email
getUserDesigByMail(_id: string) {
  return this.http.get(environment.apiBaseUrl + `/getUserDesigByMail/${_id}`);
}
//get user detailes by user id
getUserDetailesById(_id: string) {
  return this.http.get(environment.apiBaseUrl + `/getUserDetailesById/${_id}`);
}
//To view user profile for other users by id
findUserProfilebyId(_id: string) {
  return this.http.get(environment.apiBaseUrl + `/getProfileById/${_id}`);
}


//------------------THIS IS FOR ARCHIVED USERs---------------------------

//To get all archived users 
getAllArchivedUsers() {
  return this.http.get(environment.apiBaseUrl + '/getArchivedUsers');
}
//To post user to the Archived 
postArchivedUser(data){
  return this.http.put(environment.apiBaseUrl+'/postArchivedUser',data);
}
//To remove Archived user 
deleteArchivedUser(data){
  return this.http.put(environment.apiBaseUrl+'/deleteArchivedUser',data);
}
//To restore Archived user
restoreArchivedUser(data){
  return this.http.put(environment.apiBaseUrl+'/restoreArchivedUser',data);
}
//to get all archived user count
getAllArchivedUsersCout() {
  return this.http.get(environment.apiBaseUrl + '/getArcUsers');
}






  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  //Custom
  getRole(){
    return localStorage.getItem('userRole');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  //To get current time
  toCurrentTime(){
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    //console.log(date); // 2015-09-13 03:39:27
    var stillUtc = moment.utc(date).toDate();
    this.localTimeService = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    //console.log(local); // 2015-09-13 09:39:27
}

//to provide global get userdetailes 
getUserdetailes(){
  this.getUserProfile().subscribe(
    res => {
       this.userDetails = res['user'];
    },
    err => { 
      console.log(err);
      
    }
  )
}
//to provide refresh other user list
refreshUsersList() {
  this.getAllUsers().subscribe((res) => {
    this.allUsers = res as OTHERUSERS[];
  });
}

getDate(date){
   var stillUtc = moment.utc(date).toDate();
   var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
   return currentTime;
}



//this is for to send designation by user email
getDesignation(mail){
  this.getUserDesigByMail(mail).subscribe((res) => {
    this.userDesig= res as User[];
  });
  //return this.userDesig.position;
}









}



