import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  
  user={
    role:localStorage.getItem('userRole')
  };

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUserdetailes();
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



}
