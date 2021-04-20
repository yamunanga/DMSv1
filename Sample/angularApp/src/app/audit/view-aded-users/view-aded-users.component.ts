import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/shared/audit.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-aded-users',
  templateUrl: './view-aded-users.component.html',
  styleUrls: ['./view-aded-users.component.css']
})
export class ViewAdedUsersComponent implements OnInit {
  public page=1
  public pageSize=10;
  sName;//Ng model for search name
  cTodayAddedUsers;//for get the count
  constructor(public audit:AuditService,public userService: UserService) { }

  ngOnInit(): void {
    this.refreshTodayUsersList();
    this.getTodayUsersCount();
  }

//to pass today aded users
refreshTodayUsersList() {
  this.audit.getTodayUsers().subscribe((res) => {
    this.audit.allUsersToday = res as OTHERUSERS[];
  });
}

//to pass today aded users count
getTodayUsersCount(){
  this.audit.getTodayUsersC().subscribe((res) => {
    this.cTodayAddedUsers= res[0];
  },err=>{
    this.cTodayAddedUsers=0;
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
//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
   this.ngOnInit();
    //this.search();
    //console.log(event);
  }
}

search(){
  if(this.sName !=""){
    this.userService.allUsers=this.userService.allUsers.filter(res=>{
       var nowCreate= this.userService.getDate(res.createdAt);
       var nowActive=this.userService.getDate(res.lastActive);
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





}
