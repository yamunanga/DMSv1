import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CATEGORIES } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { SUBCATEGORIES } from 'src/app/shared/subCategory.model';
declare var $:any; //for tool tip to work
@Component({
  selector: 'app-sub-cat-only',
  templateUrl: './sub-cat-only.component.html',
  styleUrls: ['./sub-cat-only.component.css']
})
export class SubCatOnlyComponent implements OnInit {

  constructor(public catService:CategoryService,public depService:DepartmentService,private toastr: ToastrService) { }
  viewDepModel={
    _id:''
  }
  addSubModel={
    _id:this.viewDepModel._id,
    time:1,
    sC:''
  }
  addSubSubModel={
    _id:'',
    time:2,
    sC:''
  }
  depId:String;
  depName:String;
  isSubClick:boolean;//to create category input to hidden
  fromGetScat:String; //to get cat id when getting sub cat list
  CountCat; //to get count of categories of relevent department
  CountSub;// to get subcategory count by catId getSubCategoriesCount
  CountSubSub;//to get subcategory count inside of another sub category
  catId:String;//for get count again
  sNameM;//Ng model for search name
  sNameS;//Ng model for search sub category(scat)
  sNameSs;//Ng model for search sub category inside of another sub category
  fromGetSScat;//this is for root button
  rootName:String;//this is for root name
  mainCatName:String;//this is for pass main cat name
  mainCatPath:String;//this is for pass main cat path
  selectedCubName:String;//to get selected main category name 
  selectedScubName:String;//to get selected sub category name 
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessage2: boolean;
  serverErrorMessages2: string;
  subPath:String;
  subName:String;

  ngOnInit(): void {
    this.refreshDepartmentList();
    this.catService.currentPath='';
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
// to get subcategory count by catId getSubCategoriesCount
getSubCount(_id,name){
  this.selectedCubName=name;
  this.catService.getSubCount(_id).subscribe((res) => {
    this.CountSub = res[0];
    console.log(this.CountSub);
    console.log(this.selectedCubName);
  });
}
//to get subcategory count inside of another sub category
getSubSubCount(_id,name){
   this. selectedScubName=name;
  this.catService.getSubSubCount(_id).subscribe((res) => {
    this.CountSubSub = res[0];
    console.log(this.CountSubSub);
    console.log(this.selectedScubName);
  });
}

//for detect backspace for search category
onKeydown(event) {
  if (event.key === "Backspace") {
   // this.refreshUsersList();
    this.refreshCatList(this.depId);
    //this.search();
    console.log(event);
  }
}

//for detect backspace for search sub category (scat)

onKeydown1(event) {
  if (event.key === "Backspace") {
    this.refreshScatList(this.fromGetScat);
    console.log(event);
  }
}
//for detect backspace for search sub category inside subcategory (sscat)
onKeydown2(event){
  if (event.key === "Backspace") {
    this.refreshSScatList(this.fromGetSScat); 
    console.log(event);
  }
}
//used--avoiding null values for search sub category (scat)
searchS(){
  if(this.sNameS !=""){
    this.catService.allScatsById=this.catService.allScatsById.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var create=this.catService.getDate(res.createdAt);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameS.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameS.toLocaleLowerCase());
      }else if((create != null)&&(create.toLocaleLowerCase().match(this.sNameS.toLocaleLowerCase()))){
        return create.toLocaleLowerCase().match(this.sNameS.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameS==""){
  this.refreshScatList(this.fromGetScat);
  }
}

//used for search sub category inside another subcategory
searchSs(){
  if(this. sNameSs !=""){
    this.catService.allSScatsById=this.catService.allSScatsById.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var create=this.catService.getDate(res.createdAt);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameSs.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameSs.toLocaleLowerCase());
      }else if((create != null)&&(create.toLocaleLowerCase().match(this.sNameSs.toLocaleLowerCase()))){
        return create.toLocaleLowerCase().match(this.sNameSs.toLocaleLowerCase());
      }
 })
 

}else if(this. sNameSs==""){
  this.refreshSScatList(this.fromGetSScat); 
   
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



onAdd1(){
    this.catService.postSubCategory(this.addSubModel).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 2000);
        this.resetOnAdd1();
        this.ngOnInit();
        this.refreshScatList(this.fromGetScat);
        //this.refreshDepartmentList();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if( err.status===404){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        
      },
    );
  }

//for create sub cat inside another sub
onAdd2(){
  this.catService.postSubCategory(this.addSubSubModel).subscribe(
    res => {
      //this.showSucessMessage2 = true;
      //setTimeout(() => this.showSucessMessage2= false, 2000);
      this.toastr.success('Sub Category Added Successful');
      this.resetOnAdd2();
      this.ngOnInit();
      this.refreshSScatList(this.fromGetSScat);
      //this.refreshScatList(this.fromGetScat);
      //this.refreshDepartmentList();
    },
    err => {
      if (err.status === 422) {
        //this.serverErrorMessages2 = err.error.join('<br/>');
        this.toastr.error('Duplicate Name Found !');
      }
      else if( err.status === 404){
        //this.serverErrorMessages2 = err.error.join('<br/>'); 
        this.toastr.error('Sub Category not find !');
      }
      else
        //this.serverErrorMessages2 = 'Something went wrong.Please contact admin.';
        this.toastr.error('Something went wrong.Please contact admin.');
      
    },
  );
}

//to reset veriables
resetOnAdd1(){
 //this.addSubModel._id =''
 this.addSubModel.sC=''
 this.serverErrorMessages=''
}
resetOnAdd2(){
  this.addSubSubModel.sC=''
  this.serverErrorMessages2=''
}

//to get Sub categori list by cat id
refreshScatList(id) {
    this.fromGetScat=id;
    this.catService.toGetAllScatsById(id).subscribe((res) => {
    this.catService.allScatsById= res as SUBCATEGORIES[];
  });
}
//for get the subcategories inside another sub category
refreshSScatList(id) {
  this.fromGetSScat=id;
  this.catService.toGetAllSScatsById(id).subscribe((res) => {
  this.catService.allSScatsById= res as SUBCATEGORIES[];
});
}

//to create category input to hidden
toHidden(){
  this.isSubClick=true;
}

//to get sub path
passPath(path){
  this.subPath=path;
  
}
//to get sub name
passMainSubName(name){
  this.subName=name;
}
//pass manin sub name again
passMainSubNameAgain(name){
  this.subName=name;
}



//to pass root cat name
passMainRootCatname(name){
  this.rootName=name;
  this.subName=name;
}

//pass main cat name and path
passMainCatData(name,path){
  this.mainCatName=name
  this.mainCatPath=path
}


//to delete department
onDel(_id){
  this.catService.deleteSubCat(_id).subscribe(
    res => {
      this.toastr.success('Sub Category Deleted Successful');
      this.refreshScatList( this.fromGetScat);
      this.refreshSScatList( this.fromGetSScat);
      this.resetForDel();
     
    },
    err => {
      if (err.status === 422) {
        //this.serverErrorMessages2 = err.error.join('<br/>');
         this.toastr.error('Eror from Backend!');
      }
      else if( err.status==404){
        //this.serverErrorMessages2 = err.error.join('<br/>');
        this.toastr.error('Sub Category not find !');
      }
      else
        //this.serverErrorMessages2= 'Something went wrong.Please contact admin.';
        this.toastr.error('Something went wrong.Please contact admin.');
      
    },
  );
}

//reset data for sub 
resetForDel(){
  this.addSubSubModel._id ='';
}

//Pass current path for upload location

currentPath(path){
  this.catService.currentPath=path;
}

//for tool tip to work
/*function () {
  $('[data-toggle="tooltip"]').tooltip();
}*/

//to set current location to upload location
swapPath(){
  this.catService.uploadPath=this.catService.currentPath.toString();
  this.toastr.success('Upload Location Added !');
}

}
