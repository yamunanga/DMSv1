import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { getMaxListeners } from 'process';
import { throwIfEmpty } from 'rxjs/operators';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {
  sNameM;//Ng model for search name
  mailesArr=[]; //this is for send messages
  allMailes=[];//this is for all mails
  multipleFiles = []; //This is for multiple attachments
  count=0;//Count for select mailes
  showSucessMessage: boolean;
  serverErrorMessages: string;
  isSelectAll=false;//for unselect all
  clicked = false;
  sendModel={
    fromEmail:'',
    toEmail:'',
    msgBody:''
  }
  // ViewChild is used to access the input element. 
  @ViewChild('takeInput', {static: false}) 
  // this InputVar is a reference to our input. 
  InputVar: ElementRef; 
  constructor(public userService: UserService,private http: HttpClient,private toastr: ToastrService,public messageService: MessageServiceService) { }

  ngOnInit(): void {
   this.refreshUsersList();
    this.reset();
  }

  //to get user list
  refreshUsersList() {
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.allUsers = res as OTHERUSERS[];
    });
  }

//not used
  searchn(){
    if(this.sNameM !=""){
      this.userService.allUsers=this.userService.allUsers.filter(res=>{
         //var nowCreate= this.getDate(res.createdAt);
         var nowActive=this.userService.getDate(res.lastActive);
      if(res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if(res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
      /*else if(nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
       
      }*/
      else if(nowActive.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return nowActive.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      } else if(res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.department.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      } else if(res.position.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase())){
        return res.position.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }
    })
    }else if(this.sNameM==""){
      //this.ngOnInit();
    }
  }

//used--avoiding null values--
search(){
  if(this.sNameM !=""){
    this.userService.allUsers=this.userService.allUsers.filter(res=>{
      //var nowCreate= this.getDate(res.createdAt);
      var nowActive=this.userService.getDate(res.lastActive);
      if((res.fullName != null)&&(res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.fullName.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.role != null)&&(res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.role.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.status != null)&&(res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.status.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((res.email != null)&&(res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return res.email.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
      }else if((nowActive != null)&&(nowActive.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase()))){
        return nowActive.toLocaleLowerCase().match(this.sNameM.toLocaleLowerCase());
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

//to get profile data from backend 
 getOtherUserdetailes(email){
  this.userService.otherUserEmail.email=email;
  this.userService.viewOtherUserProfile(this.userService.otherUserEmail).subscribe(
    res => {
       this.userService.otherUserProfile= res['user'];
    },
    err => { 
      //console.log(err);
      this.toastr.error(err);
      
    }
  )
}


//new select mailes
selectMailes(email){
  var len=this.mailesArr.length;
  //this.mailesArr.push(email);
  var chk = this.mailesArr.includes(email);
  if(chk==false){
    this.mailesArr.push(email);
  }else if(chk==true){
    this.toastr.error('Already selected !');
  }
}






//to reset selectMail
reset(){
  this.count=0;
  this.mailesArr.splice(0,this.mailesArr.length);
  
   this.serverErrorMessages ="";
}

//Delete arr element
del(key){
  //if(this.mailesArr)
  var temp;
  var len=this.mailesArr.length;
  for (var i = 0; i < len; i++) {
    if(this.mailesArr[i]==key){
       temp=this.mailesArr[len-1]
       this.mailesArr[len-1]=this.mailesArr[i];
       this.mailesArr[i]=temp;
       this.mailesArr.pop();
       this.count=this.count-1;
    }else if(len==0){
      this.reset();
    }
  }
}


//To send msg--not used----
sendMsg(){
  var len=this.mailesArr.length;
  for(var i=0;i<len;i++){
    var email=this.mailesArr[i];
    //console.log(email);
    this.sendModel.fromEmail=this.userService.userDetails.email;
    this.sendModel.toEmail=email;
    this.messageService.postMsg(this.sendModel).subscribe((res) => {
      //this.toastr.success('Message Send !');
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.ngOnInit();
      this.resetSentModel();
    }, err => {
      if (err.status === 404) {
       // this.serverErrorMessages = err.error.join('<br/>');
       this.serverErrorMessages = 'User Not Found !'
      }
      else if (err.status === 422) {
        //this.serverErrorMessages = err.error.join('<br/>');
        this.serverErrorMessages = 'Sent failed !'
      }
      else
       //this.serverErrorMessages = err.error.join('<br/>');
       this.serverErrorMessages = 'Something Went Wrong !'
     }
   );
  }
}

//to send message with files
onSend(){
  var len=this.mailesArr.length;
  console.log(len)
  for(var i=0;i<len;i++){
    var email=this.mailesArr[i];
    const formData = new FormData();
    formData.append('fromEmail',this.userService.userDetails.email);
    //console.log(formData.get('fromEmail'));
    formData.append('toEmail',email);
    //console.log(formData.get('toEmail'));
    formData.append('msgBody', this.sendModel.msgBody);
    //console.log(formData.get('msgBody'));
    for(let file of this.multipleFiles){
      formData.append('files',file);
    }
    this.http.post<any>(environment.apiBaseUrl+'/postFiles', formData,{
      reportProgress: true,
    }).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
      },
      (err) =>{
        this.serverErrorMessages = err.error.join('<br/>');
      }
   );
  }
  this.ngOnInit();
  this.resetSentModel();
  this.inputReset();
}







//input reset
inputReset(){
 // We will clear the value of the input  
   // field using the reference variable.
   this.InputVar.nativeElement.value = "";
}







//To send msg to all
sendAll(){
  this.reset();//reset mail arr
  this.isSelectAll=true;
  var len= this.userService.allUsers.length;
  console.log(len);
  for(var i=0;i<len;i++){
   //console.log(this.userService.allUsers[i].email);
   this.mailesArr.push(this.userService.allUsers[i].email);
  }
}
//to unselect all usesr
unselect(){
  this.isSelectAll=false;//for unselect all
  this.reset();
}

resetSentModel(){
  this.sendModel={
    fromEmail:'',
    toEmail:'',
    msgBody:''
  }
}


//to refresh users
refresh(){
  this.refreshUsersList();
  this.sNameM='';
}
//to view online users
status(){
   this.sNameM='online';
   this.search();
}

//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.refreshUsersList();
    //this.search();
    console.log(event);
  }
}

//This is for select file event
selectMultipleFiles(event){
  if (event.target.files.length > 0) {
    this.multipleFiles = event.target.files;
  }
}

//To clear the form data
clearFormData( fd )
{
  for( var prop in fd )
  {
    if ( typeof fd[ prop ] != "function" )
    {
      fd[ prop ] = "";
    }
  }
}





}









