import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  constructor() { }
  tofViewUsers=false; //this is for view today added users
  tofViewArcUsers=false;//this is for view today archived users
  tofViewTodayDocs=true; //this is for view today added docs
  tofViewTodayArcDocs=false; //this is for view today archived docs
  tofViewTodayAutoArcDocs=false;//this is for view today auto archived docs
  tofViewTodayAssaigned=false; //this is for view today assaigned docs
  tofViewTodayApproved=false;//this is for view today approved docs
  tofViewTodayNewWorkflows=false;//this is for view today new workflows
  tofViewTodayEndWorkflows=false;//this is for view today ended workflows
  dropDownUser='USERS';
  dropDownDocs='DOCS';
  ngOnInit(): void {
  }
 
  //to open viewDocs
  viewDocs(){
   this.refresh();
   this.tofViewTodayDocs=true;
  }

  //to open view users
  viewUsers(){
    this.refresh();
    this.tofViewUsers=true;
  }
  
  //to open today arc users
  viewArcUsers(){
    this.refresh();
    this.tofViewArcUsers=true;
  }
  
  //to open today arc docs
  viewArcDocs(){
    this.refresh();
    this.tofViewTodayArcDocs=true;
  }

  //to open today assaigned docs
  viewAssaignedDocs(){
    this.refresh();
    this.tofViewTodayAssaigned=true;
  }
  
  //to open today approved docs
  viewApprovedDocs(){
    this.refresh();
    this.tofViewTodayApproved=true;
  }
  
  //to open today auto archived docs
  viewAutoArcDocs(){
    this.refresh();
    this.tofViewTodayAutoArcDocs=true;
  }
  //to open today created workflows
  viewTodayWorkflows(){
    this.refresh();
    this.tofViewTodayNewWorkflows=true;
    
  }
  //to open today ended workflows
  viewTodayEndWorkflows(){
    this.refresh();
    this.tofViewTodayEndWorkflows=true;
  }
  convertName(name){
    this.dropDownUser=name;
    
  }

  convertDocDropdownName(name){
    this.dropDownDocs=name;
  }


  refresh(){
    this.tofViewTodayDocs=false;
    this.tofViewUsers=false;
    this.tofViewArcUsers=false;
    this.tofViewTodayArcDocs=false;
    this.tofViewTodayAssaigned=false;
    this.tofViewTodayApproved=false;
    this.tofViewTodayAutoArcDocs=false;
    this.tofViewTodayNewWorkflows=false;
    this.tofViewTodayEndWorkflows=false;
    this.dropDownUser='USERS';
    this.dropDownDocs='DOCS';
  }


}
