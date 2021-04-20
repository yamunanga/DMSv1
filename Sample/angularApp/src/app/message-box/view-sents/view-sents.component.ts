import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { MESSAGE } from 'src/app/shared/message.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-sents',
  templateUrl: './view-sents.component.html',
  styleUrls: ['./view-sents.component.css']
})
export class ViewSentsComponent implements OnInit {
  //this is for pass sent message id to delete
  msg={
    _id:''
  }
  sName;//Ng model for search name
  public page=1
  public pageSize=10;
  constructor(public messageService: MessageServiceService,public userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshSentsList();
    this.reset();
  }
 
  //To get Sents messages 
  refreshSentsList() {
    this. messageService.viewSents().subscribe((res) => {
      this.messageService.allSents = res as MESSAGE[];
    });
  }
  
  passSentBdy(bdy){
    this.messageService.passSBody=bdy;
  }
  passDelete(_id){
    this.msg._id=_id;
    if (confirm('Are you sure to Delete Message ?') == true) {
      this.messageService.delSent(this.msg).subscribe((res) => {
      this.ngOnInit();
      this.toastr.success('Message Deleted !');
      }, err => {
        if (err.status === 404) {
          this.toastr.error('Message Not Found!');
        }
        else if (err.status === 422) {
          this.toastr.error('Can Not Delete !');
        }
        else
          this.toastr.error('Something went wrong!');
        
      },
        
      
      );
    }
  }

//to reset msg property
 reset(){
  this.msg={
    _id:''
  }
 }
 search(){
  if(this.sName !=""){

    this.messageService.allSents=this.messageService.allSents.filter(res=>{
    var date=this.userService.getDate(res.createdAt); //recived date
    if(res.from.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.from.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.to.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.to.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(date.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return date.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.isRead.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.isRead.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }else if(res.body.toLocaleLowerCase().match(this.sName.toLocaleLowerCase())){
      return res.body.toLocaleLowerCase().match(this.sName.toLocaleLowerCase());
    }
  })
  }else if(this.sName==""){
    this.ngOnInit();
  }
}
//for manual search
searchNew(){
  this.search();
}
//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.refreshSentsList();
    //this.search();
    console.log(event);
  }
}

//for get the message attachments

passAtach(arr){
  this.messageService.attachments=arr;
 // console.log(this.messageService.attachments);
}



//To delete all sents
delAll(){
  //this.isSelectAll=true;
  var len=  this.messageService.allSents.length;
  //console.log(len);
  if (confirm('Are you sure to Delete Message ?') == true) {
  for(var i=0;i<len;i++){
   this.msg._id= this.messageService.allSents[i]._id;
   this.messageService.delSent(this.msg).subscribe((res) => {
    }, err => {
      if (err.status === 404) {
        this.toastr.error('Message Not Found!');
      }
      else if (err.status === 422) {
        this.toastr.error('Can Not Delete !');
      }
      else
        this.toastr.error('Something went wrong!');
      
    },
      
    
    );
  }
  this.toastr.success('Messages Deleted !');
  this.refreshSentsList();
 }
}
















}
