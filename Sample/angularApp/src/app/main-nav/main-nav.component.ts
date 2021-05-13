import { Component} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationService } from '../shared/navigation.service';
import { Router } from '@angular/router';
import { CategoryService } from '../shared/category.service';
import { MessageServiceService } from '../shared/message-service.service';
import { UserService } from '../shared/user.service';
import * as moment from 'moment';
import { ViewChild } from '@angular/core';
import { ManageDocMainService } from '../shared/manage-doc-main.service';
import { DocumentService } from '../shared/document.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    lastData={
      lastActive:'',
    }
    showSucessMessage: boolean;
    serverErrorMessages: string;
    role:string;//data come from local storage
    time = new Date();
    timer;
    isLoggedIn$: Observable<boolean>;
    // [ngStyle]="{'width':this.userService.isLoggedIn() != false ? '200px' : '0px' }"
  constructor(private documentService:DocumentService,public userService: UserService,private router: Router,private catService:CategoryService,public messageService: MessageServiceService,public  navigationService: NavigationService,private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.userService.isLoggedIn();
    //this.userService.checkUser();
    this.documentService.getAutoArc();
    this.getRole();
    this.whenStart();
    this.timerFor();
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }
//*ngIf="isLoggedIn$ | async as isLoged"

 //timer
 timerFor(){
  this.timer = setInterval(() => {
    this.time = new Date();
    this.messageService.getNewMsgCount();
  }, 1000);
}

//to set user status 
whenStart(){
  this.userService.userStatus.status="online";
  this.toPutuserStatus();

}
onLogout(){
  this.toCurrentTime();
  this.toGetLastActiveData();
  this.userService.userStatus.status="offline";
  this.toPutuserStatus();
  this.userService.deleteToken();
  localStorage.removeItem('userRole');
  //to reset file upload paths
  this.catService.uploadPath=''; 
  this.navigationService.disableNav();
  this.navigationService.changeClsDefault();
  this.userService.isLoggedIn();
  this.router.navigate(['/noAuth/login']);
  
}

getUserdetailes(){
  this.userService.getUserProfile().subscribe(
    res => {
       this.userService.userDetails = res['user'];
    },
    err => { 
      //console.log(err);
      
    }
  )
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


 //to get current time 
 toCurrentTime(){
  var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  //console.log(date); // 2015-09-13 03:39:27
  //var stillUtc = moment.utc(date).toDate();
  //this.localTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
  //console.log(local); // 2015-09-13 09:39:27
  this.lastData.lastActive = date;
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



//get user role
getRole(){
  this.role=this.userService.getRole()
}

}
