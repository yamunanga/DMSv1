import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/category.service';
import { DEPARTMENTS } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { ManageDocMainService } from 'src/app/shared/manage-doc-main.service';
import { NEEDAPPROVEDATA } from 'src/app/shared/needApproveBy.model';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { TEMPDOCUMENTS } from 'src/app/shared/tempDoc.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowService } from 'src/app/shared/workflow.service';
import { WORKFLOWDATA } from 'src/app/models/workFlow.model';
import { DocumentService } from 'src/app/shared/document.service';
import { ManageApprovementServiceService } from 'src/app/shared/manage-approvement-service.service';

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.css']
})
export class UploadDocComponent implements OnInit {
  multipleFiles = []; //This is for multiple documents
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessage2: boolean; //for save tempdocs
  serverErrorMessages2: string; //for save tempdocs
  showSucessMessage3: boolean; //for delete all tempdocs
  serverErrorMessages3: string; //for delete all tempdocs
  selectDepartment:String;
  mainCategory:String;
  newPath:String;//this is for upload path conversion
  //countTemp;//this is for get temp document count
  isClicked=false;
  // ViewChild is used to access the input element. 
  @ViewChild('takeInput', {static: false}) 
  // this InputVar is a reference to our input. 
  InputVar: ElementRef;
  //to pass the rename data
  passModel={
    _id:'',
    name:''
  }
  //this is for get today data 
  model: NgbDateStruct;

  constructor(public manageApprovment:ManageApprovementServiceService,public documentService:DocumentService,public workflow:WorkflowService,public datePickerService:DatePickerService,private http: HttpClient,public departmentService:DepartmentService,public catService:CategoryService,private toastr: ToastrService,public tempDocService:TempDocService,private manageDocMainService:ManageDocMainService,private calendar: NgbCalendar) { }
  
  ngOnInit(): void {
    this.reset();
    this.refreshDepList();
    this.refreshTempDocList();
    this.resetVariable();
  }

  resetVariable(){
    this.documentService.toPassDocId='empty';
    this.workflow.passWorkflowId='empty';
    this.manageApprovment.toPassDocIdApr='empty';
  }
  //this is for get today
   selectToday() {
    this.model = this.calendar.getToday();
  }
   
 //This is for select file event
selectMultipleFiles(event){
  this.isClicked=true;
  if (event.target.files.length > 0) {
    this.multipleFiles = event.target.files;
  }
}

/*
router.post('/postTempDocFile/:dep/:mC',jwtHelper.verifyJwtToken,ctrlTempD.postTempDocWithFile);
router.post('/postTempDocFileSub/:dep/:mC/:sC',jwtHelper.verifyJwtToken,ctrlTempD.postTempDocWithFile);

*/

//old function
onSendOld(){
 
  const formData = new FormData();
 // formData.append('fromEmail',this.userService.userDetails.email);
 //${_id}
  for(let file of this.multipleFiles){
    formData.append('files',file);
    //console.log(formData);
  }
  if(this.datePickerService.pickerModel.day > 0){
    var date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString()
    formData.append('expDate',date)
  }
  //'/postTempDocFile/:dep/:mC'
  var path=this.conPath(this.catService.uploadPath);
  this.http.post<any>(environment.apiBaseUrl+'/postTempDocFileSub/'+path, formData,{
    reportProgress: true,
  }).subscribe(
    (res) => {
      //this.showSucessMessage = true;
      //setTimeout(() => this.showSucessMessage = false, 4000);
      this.toastr.success('File Added Successful');
      this.reset();
      this.resetNativeElement();
      this.refreshTempDocList();
      
    },
    (err) =>{
      //this.serverErrorMessages = err.error.join('<br/>');
      if (err.status === 422) {
        //this.serverErrorMessages2 = err.error.join('<br/>');
        this.toastr.error('File upload unsuccessfull !');
      }
    }
 );

}

//working 
onSend(){
  this.selectToday();
  const formData = new FormData();
 // formData.append('fromEmail',this.userService.userDetails.email);
 //${_id}
  for(let file of this.multipleFiles){
    formData.append('files',file);
  }
  if(this.datePickerService.pickerModel.day > 0){
    if(this.datePickerService.pickerModel.year >=this.model.year && this.datePickerService.pickerModel.month >=this.model.month && this.datePickerService.pickerModel.day >this.model.day){
      var date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString()
      formData.append('expDate',date)
      var path=this.conPath(this.catService.uploadPath);
  this.http.post<any>(environment.apiBaseUrl+'/postTempDocFileSub/'+path, formData,{
    reportProgress: true,
  }).subscribe(
    (res) => {
      //this.showSucessMessage = true;
      //setTimeout(() => this.showSucessMessage = false, 4000);
      this.toastr.success('File Added Successful');
      this.reset();
      this.resetNativeElement();
      this.refreshTempDocList();
      
    },
    (err) =>{
      //this.serverErrorMessages = err.error.join('<br/>');
      if (err.status === 422) {
        //this.serverErrorMessages2 = err.error.join('<br/>');
        this.toastr.error('File upload unsuccessfull !');
      }
    }
 );
    }else{
      this.toastr.error('Incorrect Date !');
    }
  }else{
    var path=this.conPath(this.catService.uploadPath);
    this.http.post<any>(environment.apiBaseUrl+'/postTempDocFileSub/'+path, formData,{
      reportProgress: true,
    }).subscribe(
      (res) => {
        //this.showSucessMessage = true;
        //setTimeout(() => this.showSucessMessage = false, 4000);
        this.toastr.success('File Added Successful');
        this.reset();
        this.resetNativeElement();
        this.refreshTempDocList();
        
      },
      (err) =>{
        //this.serverErrorMessages = err.error.join('<br/>');
        if (err.status === 422) {
          //this.serverErrorMessages2 = err.error.join('<br/>');
          this.toastr.error('File upload unsuccessfull !');
        }
      }
   );
  }
  
}


//to convert  file upload location to text
conPath(path){
  var str=path.split('/');
  this.newPath=''
  for(var i=0;i<str.length;i++){
    this.newPath=this.newPath+str[i]+'-'
  }
 return this.newPath
}







//To get departments
refreshDepList() {
  this.departmentService.getDepList().subscribe((res) => {
    this.departmentService.allDeps= res as DEPARTMENTS[];
  });
}
//to get need approvment array detailes
toGetNeedApproveArray(_id){
  this.tempDocService.tempDocId=_id;
  this.tempDocService.getApprovementData(_id).subscribe((res) => {
    this.tempDocService.needAproveArr= res as NEEDAPPROVEDATA[];
  });
  //console.log(this.tempDocService.needAproveArr);
}
//to get workflow array data
toGetWorkflowArray(_id){
  this.workflow.getWorkflowData(_id).subscribe((res) => {
    this.workflow.workflowArr= res as WORKFLOWDATA[];
  });
  this.workflow.getWorkflowDataLen(_id).subscribe((res) => {
    this.workflow.workflowArrCount= res[0];
  });
}

//to reset values
reset(){
  this.selectDepartment='',
  this.mainCategory=''
  this.isClicked=false;
  // We will clear the value of the input  
   // field using the reference variable.
   

}
//reset native element
resetNativeElement(){
  this.InputVar.nativeElement.value = ""; 
}

//choose file upload path
choosePath(){
  this.manageDocMainService.openSubONly();
}

//to get temp documents
refreshTempDocList() {
  this.tempDocService.getTempDocs().subscribe((res) => {
    this.tempDocService.allDocsById = res as TEMPDOCUMENTS[];
  });
  this.tempDocService.tempCount().subscribe((res) => {
    this.tempDocService.countTemp= res[0];
  });
  this.passModel._id ='';
}

//to delete an file from temp doc
onDel(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.tempDocService.deleteCat(_id).subscribe(
    res => {
      this.toastr.success('Deleted Successful');
      this.refreshTempDocList();
    },
    err => {
      this.serverErrorMessages =err.error;
      this.toastr.error(this.serverErrorMessages);
    },
  );
 }
}

//to rename temp doc
renameTemp() {
  this.tempDocService.renameTempDoc(this.passModel).subscribe(
   res => {
    this.toastr.success('File Renamed ');
    this.resetPassModel();
    this.refreshTempDocList();
   },
   err => {
     if (err.status === 404) {
      this.serverErrorMessages = err.error.join('<br/>');
      this.toastr.error(this.serverErrorMessages);
     }
     else if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
      this.toastr.error(this.serverErrorMessages);
     }
     else if(err.status === 401){
       this.serverErrorMessages = err.error.join('<br/>');
       this.toastr.error(this.serverErrorMessages);
     }
     else
       this.serverErrorMessages = 'Something went wrong.Please contact admin.';
     
   },
 );
}

//to pass new name to model
getRenameId(id){
  this.passModel._id=id;
}

//reset pass model data
resetPassModel(){
  this.passModel={
    _id:'',
    name:''
  }
}

//to transfer to documents
onPost(){
  for (let file of this.tempDocService.allDocsById) {
  //console.log(file._id);
  this.tempDocService.postToDoc(file._id).subscribe(
    res => {
      this.showSucessMessage2 = true;
      setTimeout(() => this.showSucessMessage2 = false, 3000);
      //this.toastr.success('File Upload Successful');
      this.serverErrorMessages2='';
      this.refreshTempDocList();
    },
    err => {
      if (err.status === 400) {
        this.serverErrorMessages2 = err.error.join('<br/>');
         //this.toastr.error('Eror from Backend!');
      }
      else if( err.status==404){
        this.serverErrorMessages2 = err.error.join('<br/>');
        //this.toastr.error('Doc not find !');
      }
      else
        this.serverErrorMessages2= 'Something went wrong.Please contact admin.';
        //this.toastr.error('Something went wrong.Please contact admin.');
      
    },
  );
  }
}
//delete all temp documents
deleteAllTemp(){
  if (confirm('Are you sure to delete this record ?') == true) {
    for (let file of this.tempDocService.allDocsById) {
      this.tempDocService.deleteCat(file._id).subscribe(
        res => {
          this.showSucessMessage3= true;
          setTimeout(() => this.showSucessMessage3 = false, 4000);
          //this.toastr.success('Deleted Successful');
          this.serverErrorMessages3='';
          this.refreshTempDocList();
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages3 = err.error.join('<br/>');
             //this.toastr.error('Eror from Backend!');
          }
          else if( err.status==404){
            this.serverErrorMessages3 = err.error.join('<br/>');
            //this.toastr.error('Doc not find !');
          }
          else
            this.serverErrorMessages3= 'Something went wrong.Please contact admin.';
            //this.toastr.error('Something went wrong.Please contact admin.');
          
        },
      );

    }

  }
}

getCheckListData(_id){
  this.tempDocService.getCheckLIst(_id).subscribe((res) => {
    this.tempDocService.checkListData = res as OTHERUSERS[];
  });
}

//to set _id for exp date,lock status and workflow data for doc 
passFileId(_id){
  this.tempDocService.passFileId=_id;
}

//to lock doc
/*
toLock(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.tempDocService.setTlock(_id,data).subscribe(
    res => {
      this.toastr.success('Deleted Successful');
      
    },
    err => {
      this.serverErrorMessages= err.error;
      this.toastr.error( this.serverErrorMessages);
      
    },
  );
 }
}

*/

//to get the doc
getLink(url){
  var ul=environment.apiDownloadUrl+'/'+url
  return ul
}




}
