import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageServiceService } from 'src/app/shared/message-service.service';
import { MESSAGE } from 'src/app/shared/message.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-view-recived',
  templateUrl: './view-recived.component.html',
  styleUrls: ['./view-recived.component.css']
})
export class ViewRecivedComponent implements OnInit {
sName;//Ng model for search name
 msg={
   _id:''
 }
  constructor(public messageService: MessageServiceService,public userService: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshRecivedList();
    this.reset();
  }
  
//To get recived messages 
  refreshRecivedList() {
    this. messageService.getRecived().subscribe((res) => {
      this.messageService.allRecived = res as MESSAGE[];
    });
  }

 //Pass recived msg body
  passBody(bdy){
    this.messageService.passRBody=bdy;
    this.userService.userDetails.email
    
  }
//pass recived attachments
passAtach(arr){
  this.messageService.recivedAttachments=arr;
  console.log(this.messageService.recivedAttachments);
}
  


//pass isRead
passIsRead(_id){
  this.msg._id=_id;
  this.messageService.isRead(this.msg ).subscribe((res) => {
    //this.toastr.success('Read !');
    this.ngOnInit();
  }, err => {
    if (err.status === 404) {
      this.toastr.error('Msg Does not exist !');
    }
    else if (err.status === 422) {
      this.toastr.error('Eror from Backend!');
    }
    else
      this.toastr.error('Something went wrong!');
    
  },
    
  
  );
}
//Pass  toEmail data to reply model
replyModel(to){
  this.messageService.replyModel.toEmail=to;
  this.messageService.replyModel.fromEmail=this.userService.userDetails.email;
}
passDelete(_id){
  this.msg._id=_id;
  if (confirm('Are you sure to Delete Message ?') == true) {
    this.messageService.delRecived(this.msg).subscribe((res) => {
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

reset(){
  this.msg={
    _id:''
  }
}


search(){
  if(this.sName !=""){

    this.messageService.allRecived =this.messageService.allRecived .filter(res=>{
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


//for detect backspace
onKeydown(event) {
  if (event.key === "Backspace") {
    this.refreshRecivedList();
    //this.search();
    console.log(event);
  }
}

//to refresh
//to refresh users
refresh(){
  this. refreshRecivedList();
  this.sName='';
}

}