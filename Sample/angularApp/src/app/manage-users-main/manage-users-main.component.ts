import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users-main',
  templateUrl: './manage-users-main.component.html',
  styleUrls: ['./manage-users-main.component.css']
})
export class ManageUsersMainComponent implements OnInit {
  tOfadd=false;//this is for add user loading
  tOfVusers=true;//this is for view users loading
  tOfVarcUsers=false;//this is for archived users loading
  constructor() { }

  ngOnInit(): void {
  }


//to add user to open
addUserOpen(){
    this.refresh();
    this.tOfadd=true;
  }
//to view users to open
viewUsersOpen(){
    this.refresh();
    this.tOfVusers=true;
}


//to view archived users to open
viewArcUsersOpen(){
   this.refresh();
   this. tOfVarcUsers=true;
}


refresh(){
 this.tOfadd=false;
 this.tOfVusers=false;
 this.tOfVarcUsers=false;
}


  
}
