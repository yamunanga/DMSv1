import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  tOfVd=true;//this is for view department--default
  tOfVp=false;//this is for view position loading
  constructor() { }

  ngOnInit(): void {
  }

//for activate department component
  loadDepartment(){
    this.refresh();
    this.tOfVd=true;
  }
 //for activate designation/position component
 loadDesignation(){
   this.refresh();
   this.tOfVp=true;
 }



  refresh(){
    this.tOfVd=false;
    this.tOfVp=false;
   }





}
