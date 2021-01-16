import { Component, OnInit } from '@angular/core';
import { POSITIONS } from 'src/app/shared/position.model';
import { PositionService } from 'src/app/shared/position.service';

@Component({
  selector: 'app-manage-positions',
  templateUrl: './manage-positions.component.html',
  styleUrls: ['./manage-positions.component.css']
})
export class ManagePositionsComponent implements OnInit {
  //to post new designation
  showSucessMessage: boolean;
  showSucessMessageList: boolean;
  serverErrorMessages: string;
  serverErrorMessagesList: string;
  addDesigModel={
    name:''
  }
  constructor(public positionService:PositionService) { }

  ngOnInit(): void {
    this.refreshDesignationList();
  }

//to pdst new designation
  onAdd(){
    this.positionService.postDesignation(this.addDesigModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.reset();
        this.refreshDesignationList();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if( err.status==404){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        
      },
    );
  }
  

//to reset model
reset(){
  this.addDesigModel={
    name:''
  }
  this.serverErrorMessages = ''
}

//to get designation list
refreshDesignationList() {
  this.positionService.getDesigList().subscribe((res) => {
    this.positionService.allPositions= res as POSITIONS[];
  });
}

//to delete designation
onDel(_id){
  this.positionService.deleteDesignation(_id).subscribe(
    res => {
      this.showSucessMessageList = true;
      setTimeout(() => this.showSucessMessageList= false, 4000);
      this.resetListMessages();
      this.refreshDesignationList();
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessagesList = err.error.join('<br/>');
      }
      else if( err.status==404){
        this.serverErrorMessagesList = err.error.join('<br/>');
      }
      else
        this.serverErrorMessagesList = 'Something went wrong.Please contact admin.';
      
    },
  );
}

//to empty eror messsages
resetListMessages(){
  this.serverErrorMessagesList ='';
}

myFunction(res,name) {
  document.getElementById("demo").innerHTML =res+" USERS IN "+name.toUpperCase()+" POSITION";
}

//to get count of users in each designation
onCount(_id,name){
  this.positionService.countUsersInDesig(_id).subscribe((res) => {
    this.positionService.count = res;
    //console.log(res);
    this.myFunction(res,name);
  });
 
 
}
}
