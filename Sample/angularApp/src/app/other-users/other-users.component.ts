import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'


import { OTHERUSERS } from '../shared/otherUsers.model';
import { UserService } from '../shared/user.service';

import * as moment from 'moment';
import { DepartmentService } from '../shared/department.service';
import { DEPARTMENTS } from '../shared/department.model';
import { PositionService } from '../shared/position.service';

@Component({
  selector: 'app-other-users',
  templateUrl: './other-users.component.html',
  styleUrls: ['./other-users.component.css']
})
export class OtherUsersComponent implements OnInit {
  localTime;//to get now time 
  relativTime: string;
  hour;//for get the date 
  sName;//Ng model for search name
  arcData={
    email:''
  };//this is for archive user data
  //for the delete user
   dellId={
    _id:''
  }
  
  public page=1
  public pageSize=10;
  //for print
  notPrint=true;
  resetBackVici=false;
  printReadyOk=false;
  constructor(public userService: UserService,private toastr: ToastrService,public departmentService:DepartmentService,public positionService:PositionService) { }

  ngOnInit(): void {
    //this.currentTime=moment().format('MMMM Do YYYY, h:mm:ss a'); //to display now date and time
    //this. getDate();
    this.refreshUsersList();
    this.userService.toCurrentTime();
    //for print
    this.notPrint=true;
    this.resetBackVici=false;
    this.printReadyOk=false;
  }


//this is for print ready
printReady(){
  this.notPrint=false;
  this.printReadyOk=true;
  this.resetBackVici=true;
}

//this is for reset back to original
resetBack(){
  this.notPrint=true;
  this.printReadyOk=false;
  this.resetBackVici=false;
}



  refreshUsersList() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.allUsers = res as OTHERUSERS[];
    });
    this.userService.getAllUsersCount().subscribe((res) => {
      this.userService.otherUserCount= res[0];
    },err => {
      this.userService.otherUserCount=0;
    }
  );
  }
  
  getDate(date){
    // var date;
     //var date = '2020-12-23T15:36:19.120+00:00';
     //console.log(date); // 2015-09-13 03:39:27
     var stillUtc = moment.utc(date).toDate();
     var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
     return currentTime;
  }
  //to convert to utc time
  getUtc(date){
    var stillUtc = moment(date).format();
    return stillUtc;
  }
  //to get current time 
  toCurrentTime(){
      var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
      //console.log(date); // 2015-09-13 03:39:27
      var stillUtc = moment.utc(date).toDate();
      this.localTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
      //console.log(local); // 2015-09-13 09:39:27
  }
  //For the last active date
  toGetRelativeTime(date){
    var stillUtc = moment.utc(date).toDate();
    this.hour=moment(stillUtc).format('hh'); 
    this.relativTime=moment().startOf(this.hour).fromNow();
   //this.relativTime=this.day
    return this.relativTime;
  }

  //for delete user
  // this.toastr.success('Password Reset successful');
  onDelete(_id) {
    this.dellId._id=_id;
   if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(this.dellId).subscribe((res) => {
      this.refreshUsersList();
      this.toastr.success('User Deleted Successful');
      }, err => {
        if (err.status === 404) {
          this.toastr.error('User Does not exist !');
        }
        else if(err.status === 402){
         this.toastr.error('Something went wrong!');
        }
        else if (err.status === 422) {
          this.toastr.error('Eror from Backend!');
        }
        else if(err.status === 401){
          this.toastr.error('Something went wrong!');
        }
        else
          this.toastr.error('Something went wrong!');
        
      },
        
      
      );
    }
  }
  //to post user to the archived !
  toArchive(email){
    this.arcData.email=email;
    if (confirm('Are you sure to Archive this User ?') == true) {
      this.userService.postArchivedUser(this.arcData).subscribe((res) => {
      this.refreshUsersList();
      this.toastr.success('User Archived!');
      }, err => {
        if (err.status === 404) {
          this.toastr.error('User Does not exist !');
        }
        else if(err.status === 423){
         this.toastr.error('cannot update user data !');
        }
        else if (err.status === 422) {
          this.toastr.error('Eror from Backend!');
        }
        else
          this.toastr.error('Something went wrong!');
        
      },
        
      
      );
    }
  }

 getUserId(id){
   this.userService.userData._id=id;
  
 }
 //This is for get other user id
 getOtherId(id){
  this.departmentService.otherUserId._id=id;
 }
 //this is for get selected user role from user list 
 getOtherUserRole(role){
    this.userService.otherUserRole=role;
 }
/*search(){
  this.userService.allUsers=this.userService.allUsers.filter(res=>{
    return res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
  })
}*/

/*search(){
  if(this.sName !=""){
    this.userService.allUsers=this.userService.allUsers.filter(res=>{
    return res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    })
  }else if(this.sName==""){
    this.ngOnInit();
  }
}*/
search(){
  if(this.sName !=""){
    this.userService.allUsers=this.userService.allUsers.filter(res=>{
       var nowCreate= this.getDate(res.createdAt);
       var nowActive=this.getDate(res.lastActive);
    if(res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.role.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.role.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.status.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.status.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.email.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.email.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
     
    }else if(nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }
    })
  }else if(this.sName==""){
    this.ngOnInit();
  }
}

//to test
/*search(){
  if(this.sName !=""){
    this.userService.allUsers=this.userService.allUsers.filter(res=>{
    var nowCreate= this.getDate(res.createdAt);
    var nowActive=this.getDate(res.lastActive);
    if(nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    
    }
   else if(nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }

//this.getUtc(this.sName.toLocaleLowerCase())
    
    })
  }else if(this.sName==""){
    this.ngOnInit();
  }
}*/

//to get dep list without selected user department
/*refreshDepsList(_id) {
  this.userService.otherUserDep._id=_id;
  this.departmentService.toUpdateOtherDepartmentList(_id).subscribe((res) => {
    this.departmentService.allDepsForOther = res as DEPARTMENTS[];
  });
}*/

}
