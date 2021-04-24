import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';

import { ARCHIVEDUSERS } from '../../shared/archivedUsers.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.css']
})
export class ArchivedUsersComponent implements OnInit {
  arcData={
    email:''
  }
  arcName;//this is ng model for search
  public page=1
  public pageSize=10;
  //for print
  notPrint=true;
  resetBackVici=false;
  printReadyOk=false;
  constructor(public userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshArcUsersList();
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

  refreshArcUsersList() {
    this.userService.getAllArchivedUsers().subscribe((res) => {
      this.userService.allArchivedUsers= res as ARCHIVEDUSERS[];
    });
    this.userService.getAllArchivedUsersCout().subscribe((res) => {
      this.userService.arcUserCout= res[0];
    },err => {
      this.userService.arcUserCout=0;
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
  //To restor user from archived
  restoreArcUser(email){
    this.arcData.email=email
    if (confirm('Are you sure to restore this User ?') == true) {
      this.userService.restoreArchivedUser( this.arcData).subscribe((res) => {
      this.refreshArcUsersList();
      this.toastr.success('User restored !');
      }, err => {
        if (err.status === 404) {
          this.toastr.error('User Does not exist !');
        }
        else if(err.status === 405){
         this.toastr.error('Archived User record not found !');
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

deleteArchivedUser(email){
  this.arcData.email=email
  if (confirm('Are you sure to delete this User ?') == true) {
    this.userService.deleteArchivedUser( this.arcData).subscribe((res) => {
    this.refreshArcUsersList();
    this.toastr.success('User deleted !');
    }, err => {
      if (err.status === 404) {
        this.toastr.error('Archived User Does not exist !');
      }
      else if(err.status === 405){
       this.toastr.error('User record not found !');
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

search(){
  if(this.arcName!=""){
    this.userService.allArchivedUsers=this.userService.allArchivedUsers.filter(res=>{
       var nowCreate= this.getDate(res.uCreatedAt);
       var nowActive=this.getDate(res.uUpdatedAt);
       var nowArchived=this.getDate(res.createdAt);
    if(res.fullName.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return res.fullName.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
    }else if(res.role.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return res.role.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
    }
    else if(res.email.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return res.email.toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
    }else if(nowCreate.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return nowCreate.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
     
    }else if(nowActive.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return nowActive.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
    }else if(nowArchived.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase())){
      return nowArchived.toString().toLocaleLowerCase().match(this.arcName.toLocaleLowerCase());
    }
  })
  }else if(this.arcName==""){
    this.ngOnInit();
  }
}


//to get profile data from backend by user id
getOtherUserdetailesById(id){
  this.userService.findUserProfilebyId(id).subscribe(
    res => {
      //this.userService.otherUserProfile= res['user']; 
      this.userService.otherUserProfile= res as OTHERUSERS[]; 
    }
  )
}




}
