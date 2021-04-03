import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CATEGORIES } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';

@Component({
  selector: 'app-category-and-sub',
  templateUrl: './category-and-sub.component.html',
  styleUrls: ['./category-and-sub.component.css']
})
export class CategoryAndSubComponent implements OnInit {

  constructor(public catService:CategoryService,public depService:DepartmentService) { }
  addCatModel={
    _id:'',
     mC:''
  }
  depName:String;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessageList: boolean;
  serverErrorMessagesList: string;
  depId:String;//for refresh cat list
  catId:String;//for get count again
  CountCat; //to get count of categories of relevent department
  sNameM;//Ng model for search name

  ngOnInit(): void {
    this.reset();
    this.refreshDepartmentList();
  }


  onAdd(){
    this.catService.postCategory(this.addCatModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 2000);
        this.reset();
        this.ngOnInit();
        //this.refreshDepartmentList();
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


//to reset model data

reset(){
  this.addCatModel={
    _id:'',
     mC:''
  }
  this.serverErrorMessages=''
}

//to get department list
refreshDepartmentList() {
  this.depService.getDepList().subscribe((res) => {
    this.depService.allDeps = res as DEPARTMENTS[];
  });
}

//to get categori list by id
refreshCatList(id) {
  this.depId=id;
  this.catService.toGetAllCatsById(id).subscribe((res) => {
    this.catService.allCatsById= res as CATEGORIES[];
  });
}


//to get catCount
passName(name,_id){
  this.depName=name;
  this.catId=_id;
  this.catService.toGetAllCatCount(_id).subscribe((res) => {
    this.CountCat = res[0];
    //console.log(this.CountCat);
  });
}


//to delete department
onDel(_id){
  this.catService.deleteCat(_id).subscribe(
    res => {
      this.showSucessMessageList = true;
      setTimeout(() => this.showSucessMessageList= false, 2000);
      //this.resetListMessages();
       this.refreshCatList(this.depId);
       this.passName(this.depName,this.catId);
       this.resetList();
      //this.refreshDepartmentList();
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

resetList(){
  this.serverErrorMessagesList=''
}

//for detect backspace for search category
onKeydown(event) {
  if (event.key === "Backspace") {
   // this.refreshUsersList();
    //this.search();
    //console.log(event);
  }
}

//used--avoiding null values--

search(){
  if(this.sNameM !=""){
    this.catService.allCatsById=this.catService.allCatsById.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var create=this.catService.getDate(res.createdAt);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((create != null)&&(create.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return create.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
   this.refreshCatList(this.depId);
  }
}


}
