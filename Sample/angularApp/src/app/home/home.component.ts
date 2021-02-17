import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 // encapsulation: ViewEncapsulation.None //for the block global styles preventing home component
})
export class HomeComponent implements OnInit {
  tOfP=true; //for user profile component to load 
  tOfR=false;//for register component to load
  toflist=false;//for the userList component to load 
  tofdocs=false;//for the document upload component to load
  tofviewDocs=false;//for the document view component to load
  tofviewArcUsers=false;//for the archived user component to load
  tofviewMessageBox=false;//for the message box load
  tofviewOrganisation=false;//for the organization component to load
  tofviewManageUsersMain=false;//for the manage users main to load 
  tofviewMangaDocMain=false;//for the manage documents main to load 
  constructor(public userService: UserService, private router: Router) { }
  lastData={
    lastActive:'',
  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  role:string;//data come from local storage

  ngOnInit(): void {
    //this.getUserdetailes();
    //this.userService.getUserdetailes();
    this.getRole();
    
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  onLogout(){
    this.toCurrentTime();
    this.toGetLastActiveData();
    this.userService.userStatus.status="offline";
    this.toPutuserStatus();
    this.userService.deleteToken();
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
    
  }
  profile(){
    this.refresh();
    this.tOfP=true;
  }
  getUserdetailes(){
    this.userService.getUserProfile().subscribe(
      res => {
         this.userService.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    )
  }
  registerUser(){
    this.refresh();
    this.tOfR=true;
    
  }
  //To reset component
  refresh(){
    this.tOfP=false; 
    this.tOfR=false;
    this.toflist=false;
    this.tofdocs=false;
    this.tofviewDocs=false;
    this.tofviewArcUsers=false;
    this.tofviewMessageBox=false;
    this.tofviewOrganisation=false;
    this.tofviewManageUsersMain=false;
    this.tofviewMangaDocMain=false;
  }
  //to load userList
  userList(){
    this.refresh();
    this.toflist=true;
  }
  //To add document works
  addDoc(){
    this.refresh();
    this.tofdocs=true;
  }
  //To view documents to work
  viewDoc(){
    this.refresh();
    this.tofviewDocs=true;
  }
  //To view archived users to work
  viewArcUsers(){
    this.refresh();
    this.tofviewArcUsers=true;

  }
  //To load messeage box
  viewMessageBox(){
    this.refresh();
    this.tofviewMessageBox=true;
  }
  //To load organization
  viewOrganization(){
    this.refresh();
    this.tofviewOrganisation=true;
  }
  //to load manage users main
  viewManageMain(){
    this.refresh();
    this.tofviewManageUsersMain=true;
  }
  //to load manage documents main
  viewDocMain(){
    this.refresh();
    this.tofviewMangaDocMain=true;
  }
  toGetLastActiveData() {
    this.userService.updateUserLastActive(this.lastData).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        // this.router.navigate(['/login']);
      },
      err => {
        if (err.status === 400) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if(err.status === 402){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if(err.status === 401){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        
      },
    );
  }

  //to get current time 
  toCurrentTime(){
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    //console.log(date); // 2015-09-13 03:39:27
    //var stillUtc = moment.utc(date).toDate();
    //this.localTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    //console.log(local); // 2015-09-13 09:39:27
    this.lastData.lastActive = date;
   }

  //To update user Status
toPutuserStatus() {
  this.userService.updateUserStatus(this.userService.userStatus).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
       //this.router.navigate(['/login']);
    },
    err => {
      if (err.status === 400) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 402){
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if (err.status === 422) {
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else if(err.status === 401){
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      
    },
  );
}


//get user role
getRole(){
  this.role=this.userService.getRole()
}








}




