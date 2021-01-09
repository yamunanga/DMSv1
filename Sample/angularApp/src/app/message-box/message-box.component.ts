import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  tOfWMsg=false;//this is for write new message loading
  tOfVSMsg=false;//this is for view sent messgae loading
  tOfVRMsg=true;//this is for view recived message loading 

  constructor() { }

  ngOnInit(): void {
  }





refresh(){
 this.tOfWMsg=false;//this is for write new message loading
 this.tOfVSMsg=false;//this is for view sent messgae loading
 this.tOfVRMsg=false;//this is for view recived message loading 
}
//this is for load write message
loadWriteMsg(){
  this.refresh();
  this.tOfWMsg=true;
}
//this is for load sent messges
loadSentsMsg(){
  this.refresh();
  this.tOfVSMsg=true;
}

//this is for load recived messages
loadRecivedMsg(){
  this.refresh();
  this.tOfVRMsg=true;
}



}
