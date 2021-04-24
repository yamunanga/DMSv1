import { Component, OnInit } from '@angular/core';
import { ARCHIVEDUSERS } from 'src/app/shared/archivedUsers.model';
import { AuditService } from 'src/app/shared/audit.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-today-archived-users',
  templateUrl: './view-today-archived-users.component.html',
  styleUrls: ['./view-today-archived-users.component.css']
})
export class ViewTodayArchivedUsersComponent implements OnInit {
  
  public page=1
  public pageSize=10;
  cTodayArcUsers;//for get the count
  arcName;//this is ng model for search
   //for print
   notPrint=true;
   resetBackVici=false;
   printReadyOk=false;
  constructor(public audit:AuditService,public userService: UserService) { }

  ngOnInit(): void {
    this.refreshTodayArcUsersList();
    this.getTodayArcUsersCount();
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
  //to pass today aded users
refreshTodayArcUsersList() {
  this.audit.getTodayArcUsers().subscribe((res) => {
    this.audit.allArcUsersToday = res as ARCHIVEDUSERS[];
  });
}

//to pass today aded users count
getTodayArcUsersCount(){
  this.audit.getTodayArcUsersCount().subscribe((res) => {
    this.cTodayArcUsers= res[0];
  },err=>{
    this.cTodayArcUsers=0;
  });
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


search(){
  if(this.arcName!=""){
    this.userService.allArchivedUsers=this.userService.allArchivedUsers.filter(res=>{
       var nowCreate= this.userService.getDate(res.uCreatedAt);
       var nowActive=this.userService.getDate(res.uUpdatedAt);
       var nowArchived=this.userService.getDate(res.createdAt);
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








}
