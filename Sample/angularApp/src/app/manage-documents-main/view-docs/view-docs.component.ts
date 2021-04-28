import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CATEGORIES } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment.prod';

import{DOCUMENTS} from '../../shared/document.model';
import { DocumentService } from '../../shared/document.service';

@Component({
  selector: 'app-view-docs',
  templateUrl: './view-docs.component.html',
  styleUrls: ['./view-docs.component.css']
})
export class ViewDocsComponent implements OnInit {
  serverErrorMessages='';
  countDocs;//for get count of docs
  role;
  sNameM;//Ng model for search name
  depName='Select Department';
  catName='Select Category';
  docType='Select Type';
  dateType='Select Date';
  clickTimes=0;
  public page=1
  public pageSize=10;
   //for print
   notPrint=true;
   resetBackVici=false;
   printReadyOk=false;
  constructor(public datePickerService:DatePickerService,public catService:CategoryService,public depService:DepartmentService,public documentService:DocumentService,public userService: UserService,private toastr: ToastrService,public tempDocService:TempDocService) { }

  ngOnInit(): void {
    this.refreshDocList();
    this.getUserdetailes();
    this.getRole();
    //for print
    this.notPrint=true;
    this.resetBackVici=false;
    this.printReadyOk=false;
  }
//this is for print ready
printReady(){
  this.notPrint=false;
  this.printReadyOk=true;
  this.resetBackVici=true;
}

//this is for reset back to original
resetBack(){
  this.notPrint=true;
  this.printReadyOk=false;
  this.resetBackVici=false;
}
  refreshDocList() {
    this.documentService.getDocs().subscribe((res) => {
      this.documentService.allDocs = res as DOCUMENTS[];
    });
    this.refreshDocCount();
  }

refreshDocCount(){
  this.documentService.getCountDocs().subscribe((res) => {
    this.countDocs= res[0];
  },err => {
    if (err.status === 404) {
      this.countDocs=0;
    }
  }
  
  
  );
}

  //to get the doc
 getLink(url){
   var ul=environment.apiDownloadUrl+'/'+url
   return ul
 }
 //to convert bytes to mega bytes
 byteToMb(byte){
   var flt= parseFloat(byte);
   var mb=flt/1024/1024
   return mb.toFixed(2);
 }

//to archive doc
toArc(_id){
  if (confirm('Are you sure to Archive this record ?') == true) {
  this.documentService.setArcDoc(_id).subscribe(
    res => {
      this.toastr.success('Archive Successfull');
      this.refreshDocList();
    },
    err => {
       this.serverErrorMessages = err.error;
       this.toastr.error( this.serverErrorMessages);
    },
  );
 }
}

//to delete an file from  documents
onDel(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.documentService.deleteDoc(_id).subscribe(
    res => {
      this.toastr.success('Deleted Successful');
      this.refreshDocList();
      
    },
    err => {
      this.serverErrorMessages= err.error;
      this.toastr.error( this.serverErrorMessages);
      
    },
  );
 }
}


//to set _id for exp date and lock status for doc 
passFileId(_id){
  this.documentService.toPassDocId=_id;
}

//get user detailes
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

//get user role
getRole(){
  this.role=this.userService.getRole()
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
     if(this.depName !='Select Department' && this.catName !='Select Category' && this.docType !='Select Type' && this.dateType =='Select Date'){
         this.findDocsForCategory(this.documentService.findDocForCat);
     }else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType !='Select Type' && this.dateType =='Select Date'){
        this.refreshDocList();
     }else if(this.depName !='Select Department' && this.catName =='Select Category' && this.docType =='Select Type' && this.dateType =='Select Date'){
        this.findDocsForDepartment(this.documentService.findDocForDep);
     }else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType =='Select Type' && this.dateType =='Select Date'){
        this.refreshDocList();
     }else if(this.depName !='Select Department' && this.catName !='Select Category' && this.docType =='Select Type' && this.dateType !='Select Date'){
       this.findDocsForCategory(this.documentService.findDocForCat);
     }else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType =='Select Type' && this.dateType !='Select Date'){
       this.refreshDocList();
     }
  }
}

//get departments list
getDepList(){
  this.depService.getDepList().subscribe(
    res => {
       this.depService.depList = res as DEPARTMENTS[];
    }
  )
}
//get category list
getCatList(_id){
  this.catService.getCategoriesForDocSearch(_id).subscribe(
    res => {
       this.catService.catList = res as CATEGORIES[];
    }
  )
}
findDocsForDepartment(_id){
  this.documentService.findDocForDep=_id;
  this.documentService.findDocsForDep(_id).subscribe(
    res => {
      this.documentService.allDocs = res as DOCUMENTS[];
    }
  )
}

findDocsForCategory(_id){
  this.documentService.findDocForCat=_id;
  this.documentService.findDocsForCat(_id).subscribe(
    res => {
      this.documentService.allDocs = res as DOCUMENTS[];
    }
  )
}

findDocType(){
  this.documentService.getDocTypes().subscribe((res) => {
    this.documentService.docTypes = res;
  });
}

setDate(){
  var date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString()
  this.sNameM=date;
  this.search();
}

passNameDep(name){
  this.depName=name;
}

passNameCat(name){
  this.catName=name;
}

passNameDate(name){
  this.dateType=name;
}
passTypeName(name){
  this.clickTimes++;
  this.docType=name;
  this.sNameM=name.toLocaleLowerCase();
  this.search();
}

//refresh list 
refreshList(){
  if(this.depName !='Select Department' && this.catName !='Select Category' && this.docType !='Select Type'){
    this.findDocsForCategory(this.documentService.findDocForCat);
}else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType !='Select Type'){
   this.refreshDocList();
}else if(this.depName !='Select Department' && this.catName =='Select Category' && this.docType =='Select Type'){
   this.findDocsForDepartment(this.documentService.findDocForDep);
}else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType =='Select Type'){
   this.refreshDocList();
}
}


//custom filter
filter(){
  this.documentService.allDocs=  this.documentService.allDocs.filter(res=>{
    if((res.type != null)&&(res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
       return res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
    }
  })
}


//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.documentService.allDocs=  this.documentService.allDocs.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var createdAt=this.userService.getDate(res.createdAt);
      var updatedAt=this.userService.getDate(res.updatedAt);
      if((res.name != null)&&(res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.name.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.category != null)&&(res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.category.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res. department != null)&&(res. department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( createdAt != null)&&( createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  createdAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(( updatedAt != null)&&(  updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return    updatedAt.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.type != null)&&(res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.type.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.createdBy != null)&&(res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.createdBy.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.expDate!= null)&&(res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.expDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.createDate!= null)&&(res.createDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return  res.createDate.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
  if(this.depName !='Select Department' && this.catName !='Select Category' && this.docType !='Select Type'){
        this.findDocsForCategory(this.documentService.findDocForCat);
    }else if(this.depName =='Select Department' && this.catName =='Select Category' && this.docType !='Select Type'){
        this.refreshDocList();
    }else if(this.depName !='Select Department' && this.catName =='Select Category' && this.docType =='Select Type'){
        this.findDocsForDepartment(this.documentService.findDocForDep);
}
  }
}

//this is for refresh
resetToggels(){
  this.depName='Select Department';
  this.catName='Select Category';
  this.docType='Select Type';
  this.sNameM='';
  this.dateType='Select Date';
  this.clickTimes=0;
  this.refreshDocList();
}

//to get profile data from backend by user id
getOtherUserdetailesById(id){
  this.userService.findUserProfilebyId(id).subscribe(
    res => {
      //this.userService.otherUserProfile= res['user']; 
      this.userService.otherUserProfile= res as OTHERUSERS[]; 
    },
    err => { 
      //console.log(err);
      this.toastr.error(err);
      
    }
  )
}


}
