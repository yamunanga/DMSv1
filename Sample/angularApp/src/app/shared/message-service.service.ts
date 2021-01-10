import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { MESSAGE } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
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






//Helpers
//for convert date coming from db
getDate(date){
   var stillUtc = moment.utc(date).toDate();
   var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
   return currentTime;
}




}
