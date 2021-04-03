import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { WORKFLOWDATA } from 'src/app/models/workFlow.model';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { TEMPDOCUMENTS } from 'src/app/shared/tempDoc.model';
import { UserService } from 'src/app/shared/user.service';
import { WorkflowService } from 'src/app/shared/workflow.service';

@Component({
  selector: 'app-model-workflow',
  templateUrl: './model-workflow.component.html',
  styleUrls: ['./model-workflow.component.css']
})
export class ModelWorkflowComponent implements OnInit {
  closeResult = '';
  selectedItems:String[];//this is for check list
  showSucessMessage1: boolean;
  serverErrorMessages1: string;
  showSucessMessage2: boolean;
  serverErrorMessages2: string;
  sNameM;//Ng model for search name
  countWork;//this is for get len of workflow
   //this is for send workflow user data
   sendData={
    name:''
  }
  //this for delete data for workflow arr
  delData={
    name:''
  }
  //get data
  data={
    mail:''
  }
  constructor(public userService: UserService,private modalService: NgbModal,public workflow:WorkflowService,private tempDocService:TempDocService) { }

  ngOnInit(): void {
    this.getCheckListData();
    this.selectedItems=new Array<String>();
  }
 
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.selectedItems=new Array<String>();
      this.reset();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.selectedItems=new Array<String>();
      this.reset();
      return 'by clicking on a backdrop';
    } else {
      this.selectedItems=new Array<String>();
      this.reset();
      return `with: ${reason}`;
    }
  }

getId(e:any,id:String){
  if(e.target.checked)
  {
    //console.log(id+' checkec');
    this.selectedItems.push(id);
  }
  else
  {
    //console.log(id+' unchecked');
    this.selectedItems=this.selectedItems.filter(m=>m!=id);
  }
  //console.log(this.selectedItems);
}

//to get check list data 
getCheckListData(){
  this.workflow.getUsersWork().subscribe((res) => {
    this.workflow.checkListData = res as OTHERUSERS[];
  });
}

//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.workflow.checkListData=this.workflow.checkListData.filter(res=>{
      if((res.fullName != null)&&(res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.role != null)&&(res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.status != null)&&(res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.email != null)&&(res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.department != null)&&(res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.position != null)&&(res.position.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.position.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
 })
 

}else if(this.sNameM==""){
    this.getCheckListData();
  }
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.getCheckListData();
    //this.search();
    //console.log(event);
  }
}

//to send workflow data to back end
onSend(){
  var len=this.selectedItems.length;
  for(var x=0;x<len;x++){
    this.sendData={
      name:this.selectedItems[x].toString()
    }
     this.workflow.addUserWork(this.tempDocService.passFileId,this.sendData).subscribe(
       res => {
         this.showSucessMessage2 = true;
         setTimeout(() => this.showSucessMessage2= false, 2000);
         this.toEmpty(this.selectedItems);
         this.toGetWorkflowArray(this.tempDocService.passFileId);
         this.serverErrorMessages2='';
         this.refreshTempDocList();
        // this.resetDel();
        
       },
       err => {
        this.serverErrorMessages2= err.error;
         
       },
     );
  }
}

//to empty selected items array
toEmpty(arr){
  var len=arr.length;
  for(var x=0;x<len;x++){
     arr.pop()
  }
 // console.log(arr);
 }
 
//reset
reset(){
  this.serverErrorMessages2='';
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


//not used
displayInfo1(name,desig,dep) {
  document.getElementById("demo").innerHTML =this.toUpper(desig)+" At "+this.toUpper(dep);
}
//used
displayInfo(name,desig,dep){
    var res=this.toUpper(name)+"-"+this.toUpper(desig)+" AT "+this.toUpper(dep);
    return res
}
//string to uppercase
toUpper(str){
  var res = str.toUpperCase();
  return res
}


onDel(mail){
  this.delData={
    name:mail
  }
  this.workflow.delUserWork(this.tempDocService.passFileId,this.delData).subscribe(
    res => {
      this.showSucessMessage1 = true;
      setTimeout(() => this.showSucessMessage1= false, 2000);
      this.toGetWorkflowArray(this.tempDocService.passFileId);
      this.refreshTempDocList();
      this.resetDel()

    },
    err => {
      this.serverErrorMessages1 = err.error;
    },
  );
}

//to reset delete data model
resetDel(){
  this.delData={
    name:''
  }
  //this.tempDocService.userId='';
  this.serverErrorMessages1=''
}



//to get temp documents
refreshTempDocList() {
  this.tempDocService.getTempDocs().subscribe((res) => {
    this.tempDocService.allDocsById = res as TEMPDOCUMENTS[];
  });
  this.tempDocService.tempCount().subscribe((res) => {
    this.tempDocService.countTemp= res[0];
  });
}

}
