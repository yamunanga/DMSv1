import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { getMaxListeners } from 'process';
import { throwIfEmpty } from 'rxjs/operators';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { OTHERUSERS } from 'src/app/shared/otherUsers.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {
  sName;//Ng model for search name
  mailesArr=[]; //this is for send messages
  allMailes=[];//this is for all mails
  count=0;//Count for select mailes
  showSucessMessage: boolean;
  serverErrorMessages: string;
  clicked = false;
  sendModel={
    fromEmail:'',
    toEmail:'',
    msgBody:''
  }
  constructor(public userService: UserService,private toastr: ToastrService,public messageService: MessageServiceService) { }

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


  search(){
    if(this.sName !=""){
      this.userService.allUsers=this.userService.allUsers.filter(res=>{
         //var nowCreate= this.getDate(res.createdAt);
         var nowActive=this.userService.getDate(res.lastActive);
      if(res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.fullName.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      }else if(res.role.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.role.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      }else if(res.status.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.status.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      }else if(res.email.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.email.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      }
      /*else if(nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return nowCreate.toString().toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
       
      }*/
      else if(nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return nowActive.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      } else if(res.department.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.department.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      } else if(res.position.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
        return res.position.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
      }
    })
    }else if(this.sName==""){
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
      console.log(err);
      
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

//to select allusers ---not work--
selectAll(){
  this.reset();
  var user;
  this.userService.allUsers.forEach(this.getMailes);
  }


//To get user emails--not work---
getMailes(item,index){
  document.getElementById("demo").innerHTML +=":" +item.email+ "<br>"; 
}

//To send msg
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

//To send msg to all
sendAll(){
  this.reset();//reset mail arr
  var len= this.userService.allUsers.length;
  console.log(len);
  for(var i=0;i<len;i++){
   //console.log(this.userService.allUsers[i].email);
   this.mailesArr.push(this.userService.allUsers[i].email);
  }
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
  this.sName='';
}
//to view online users
status(){
   this.sName='online';
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
}









