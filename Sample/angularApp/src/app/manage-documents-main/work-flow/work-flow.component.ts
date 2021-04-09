import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {

  tOfviewNewWorkflow=true;//this is for load to new workflow data
  tOfviewOldWorkflow=false;//this is for load to old workflow data
  tOfviewProcessingNow=false;//this is for track processing workflow data
  constructor() { }

  ngOnInit(): void {
  }
  //this is for load to new workflow data
  toOpenNew(){
    this.reset();
    this.tOfviewNewWorkflow=true;
  }
  //this is for load to old workflow data
  toOpenOld(){
    this.reset();
    this.tOfviewOldWorkflow=true;
  }
  //this is for track processing workflow data
  toOpenProcessing(){
    this.reset();
    this.tOfviewProcessingNow=true;
  }
  
  reset(){
    this.tOfviewNewWorkflow=false;
    this.tOfviewOldWorkflow=false;
    this.tOfviewProcessingNow=false;
  }
  
}
