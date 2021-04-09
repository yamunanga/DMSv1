import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { MESSAGE } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  countNewMsg;//for count unread message for current user
  allRecived:MESSAGE[]; //For get all recived
  allSents:MESSAGE[];//For get all sents
  attachments=[]//for pass attachments to model
  recivedAttachments=[]//for view recived attachments
  passRBody;//pass recived message body
  passSBody;//pass sent message body
  replyModel={
    fromEmail:'',
    toEmail:'',
    msgBody:''
  }

msgBody='';
//post multiple attachments with message for popup use(toEmail)
toEmail='';
//post multiple attachments with message for popup use(toId)
toId='';


  constructor(private http: HttpClient) { }

//to get all recived messages

getRecived(){
  return this.http.get(environment.apiBaseUrl + '/viewRecived');
}

//to update massage is read status
isRead(data){
  return this.http.put(environment.apiBaseUrl + '/readReciveMessage',data);
}
//To send message
postMsg(dataModel){
  return this.http.post(environment.apiBaseUrl + '/postmessage',dataModel);
}

//To delete message from recived /deleteReciveMessage
delRecived(dataModel){
  return this.http.put(environment.apiBaseUrl + '/deleteReciveMessage',dataModel);
}
//To view Sent messages
viewSents(){
  return this.http.get(environment.apiBaseUrl + '/viewSents');
}
//to delete sent message
delSent(dataModel){
  return this.http.put(environment.apiBaseUrl + '/deleteSentMessage',dataModel);
}
//to get count of new messages for current user
getNewCount(){
  return this.http.get(environment.apiBaseUrl + '/countnew');
}
//post multiple attachments with message for popup use(toEmail)
postMsgForEmail(data){
  return this.http.post(environment.apiBaseUrl+`/postMsgToEmail`,data);
}
//post multiple attachments with message for popup use(toId)
postMsgForId(data){
  return this.http.post(environment.apiBaseUrl+`/postMsgToId`,data);
}

//Helpers
//for convert date coming from db
getDate(date){
   var stillUtc = moment.utc(date).toDate();
   var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
   return currentTime;
}

//to get new message count
getNewMsgCount(){
  this.getNewCount().subscribe((res) => {
    this.countNewMsg= res;
  },err=>{
    this.countNewMsg=0;
  });
 
}


}
