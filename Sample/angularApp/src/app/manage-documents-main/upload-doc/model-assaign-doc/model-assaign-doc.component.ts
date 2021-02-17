import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NEEDAPPROVEDATA } from 'src/app/shared/needApproveBy.model';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { TempDocService } from 'src/app/shared/temp-doc.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-model-assaign-doc',
  templateUrl: './model-assaign-doc.component.html',
  styleUrls: ['./model-assaign-doc.component.css']
})
export class ModelAssaignDocComponent implements OnInit {

  constructor(private modalService: NgbModal,public tempDocService:TempDocService) { }
  closeResult = '';
  sNameM;//Ng model for search name
  selectedItems:String[];
  showSucessMessage1: boolean;
  serverErrorMessages1: string;
  showSucessMessage2: boolean;
  serverErrorMessages2: string;
  //this for delete data for needApprovement arr
  delData={
    _id:'',
    name:''
  }
  //this is for send need approvment data
  sendData={
    _id:'',
    name:''
  }
  ngOnInit(): void {
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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.selectedItems=new Array<String>();
      return 'by clicking on a backdrop';
    } else {
      this.selectedItems=new Array<String>();
      return `with: ${reason}`;
    }
  }

getId(e:any,id:String){
  if(e.target.checked)
  {
    console.log(id+' checkec');
    this.selectedItems.push(id);
  }
  else
  {
    console.log(id+' unchecked');
    this.selectedItems=this.selectedItems.filter(m=>m!=id);
  }
  console.log(this.selectedItems);
}


onDel(mail){
  this.delData={
    _id:this.tempDocService.tempDocId.toString(),
    name:mail
  }
  this.tempDocService.delNeedApprove(this.delData).subscribe(
    res => {
      this.showSucessMessage1 = true;
      setTimeout(() => this.showSucessMessage1= false, 2000);
      this.toGetNeedApproveArray(this.tempDocService.tempDocId);
      this.tempDocService.getCountApprovement(this.tempDocService.tempDocId);
      this.getCheckListData(this.tempDocService.tempDocId);
      this.resetDel();
     
    },
    err => {
      if (err.status === 422) {
        this.serverErrorMessages1 = err.error.join('<br/>');
      }
      else if( err.status==404){
        this.serverErrorMessages1 = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages1= 'Something went wrong.Please contact admin.';
      
    },
  );
}
//to send need approve data to back end
onSend(){
  var len=this.selectedItems.length;
  for(var x=0;x<len;x++){
    this.sendData={
      _id:this.tempDocService.tempDocId.toString(),
      name:this.selectedItems[x].toString()
    }
     this.tempDocService.sendNeedApprove(this.sendData).subscribe(
       res => {
         this.showSucessMessage2 = true;
         setTimeout(() => this.showSucessMessage2= false, 2000);
         this.toGetNeedApproveArray(this.tempDocService.tempDocId);
         this.tempDocService.getCountApprovement(this.tempDocService.tempDocId);
         this.getCheckListData(this.tempDocService.tempDocId);
         this.toEmpty(this.selectedItems);
        // this.resetDel();
        
       },
       err => {
         if (err.status === 422) {
           this.serverErrorMessages2= err.error.join('<br/>');
         }
         else if( err.status==404){
           this.serverErrorMessages2 = err.error.join('<br/>');
         }
         else
           this.serverErrorMessages2= 'Something went wrong.Please contact admin.';
         
       },
     );
  }
}
test(){
  var len=this.selectedItems.length;
  for(var x=0;x<len;x++){
    this.sendData={
      _id:this.tempDocService.tempDocId.toString(),
      name:this.selectedItems[x].toString()
    }
     this.tempDocService.sendNeedApprove(this.sendData).subscribe(
       res => {
         this.showSucessMessage2 = true;
         setTimeout(() => this.showSucessMessage2= false, 2000);
         this.toGetNeedApproveArray(this.tempDocService.tempDocId);
         this.tempDocService.getCountApprovement(this.tempDocService.tempDocId);
        
        // this.resetDel();
        
       },
       err => {
         if (err.status === 422) {
           this.serverErrorMessages2= err.error.join('<br/>');
         }
         else if( err.status==404){
           this.serverErrorMessages2 = err.error.join('<br/>');
         }
         else
           this.serverErrorMessages2= 'Something went wrong.Please contact admin.';
         
       },
     );
  }
}


//to get check list data again
getCheckListData(_id){
  this.tempDocService.getCheckLIst(_id).subscribe((res) => {
    this.tempDocService.checkListData = res as OTHERUSERS[];
  });
}



//to empty selected items array
toEmpty(arr){
 var len=arr.length;
 for(var x=0;x<len;x++){
    arr.pop()
 }
 console.log(arr);
}






//to reset delete data model
resetDel(){
  this.delData={
    _id:'',
    name:''
  }
  //this.tempDocService.userId='';
  this.serverErrorMessages1=''
}

//refresh need approvemnt data array
toGetNeedApproveArray(_id){
  this.tempDocService.getApprovementData(_id).subscribe((res) => {
    this.tempDocService.needAproveArr= res as NEEDAPPROVEDATA[];
  });
}

//to search admin 
search(){
  if(this.sNameM !=""){
    this.tempDocService.checkListData=this.tempDocService.checkListData.filter(res=>{
      
      if((res.fullName != null)&&(res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
      else if((res.status != null)&&(res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
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
    this.ngOnInit();
  }
}


//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.getCheckListData(this.tempDocService.tempDocId);
    //this.search();
    console.log(event);
  }
}


//to view online users
status(){
  this.sNameM='online';
  this.search();
}
//to refresh users
refresh(){
  this.getCheckListData(this.tempDocService.tempDocId);
  this.sNameM='';
}



}
