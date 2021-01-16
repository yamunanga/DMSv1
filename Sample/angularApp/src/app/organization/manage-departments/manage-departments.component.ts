import { Component, OnInit } from '@angular/core';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.css']
})
export class ManageDepartmentsComponent implements OnInit {
  showSucessMessage: boolean;
  showSucessMessageList: boolean;
  serverErrorMessages: string;
  serverErrorMessagesList: string;
  addDepModel={
    name:''
  }
  inName;//Ng model for department name add
  constructor(public depService:DepartmentService) { }

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

 onAdd(){
  this.depService.postDepartment(this.addDepModel).subscribe(
    res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.reset();
      this.refreshDepartmentList();
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

reset(){
  this.addDepModel={
    name:''
  }
  this.serverErrorMessages = ''
}

refreshDepartmentList() {
  this.depService.getDepList().subscribe((res) => {
    this.depService.allDeps = res as DEPARTMENTS[];
  });
}


//to delete department
onDel(_id){
  this.depService.deleteDep(_id).subscribe(
    res => {
      this.showSucessMessageList = true;
      setTimeout(() => this.showSucessMessageList= false, 4000);
      this.resetListMessages();
      this.refreshDepartmentList();
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

resetListMessages(){
  this.serverErrorMessagesList ='';
}

//to get count of users in each department
onCount(_id,name){
  this.depService.countDepUsers(_id).subscribe((res) => {
    this.depService.count = res;
    console.log(res);
    this.myFunction(res,name);
  });
 
 
}

myFunction(res,name) {
  document.getElementById("demo").innerHTML =res+" USERS IN "+name.toUpperCase();
}

}
