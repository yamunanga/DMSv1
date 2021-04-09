import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { NEEDAPPROVEDOCS } from './approvementData.model';

@Injectable({
  providedIn: 'root'
})
export class ManageApprovementServiceService {
  approveData:NEEDAPPROVEDOCS[];//to get need approvement data for relevent user
  approveDataCount;//to get need approve data count
  rejectDocId:'' ;//to pass reject doc/file id
  toPassDocIdApr:'';//this is for doc lock/unlock
  constructor(private http: HttpClient) { }


//to get need approvement data for relevent user
toGetApprovementData() {
  return this.http.get(environment.apiBaseUrl + `/getApprovementData`);
}
//to save approvement after user decided to not reject 
toAccept(_id:String) {
  return this.http.get(environment.apiBaseUrl + `/saveApprovment/${_id}`);
}
//to reject from approvement list
toReject(_id: string,data) {
  return this.http.put(environment.apiBaseUrl + `/rejectApprovment/${_id}`,data);
}
//to send cound of need approvment data 
toGetApprovementDataCount() {
  return this.http.get(environment.apiBaseUrl + `/getApprovmentDataCount`);
}
//to lock doc
setlockApr(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/lockdocApr/${_id}`,data);
}
//to unlock doc
unlockApr(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/unlockdocApr/${_id}`,data);
}



//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}


}