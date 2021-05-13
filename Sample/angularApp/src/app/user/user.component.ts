import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  logView=true;
  forgetView=false;
  constructor(private navigationService:NavigationService) { }

  ngOnInit(): void {
    this.navigationService.disableNav();
  }
 //to open profile view
toOpenLog(){
  this.refresh();
  this.logView=true;
}
//to open edit profile
forgetViewOpen(){
  this.refresh();
  this.forgetView=true;
}

refresh(){
  this.forgetView=false;
  this.logView=false;
}

}
