import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { NEEDAPPROVEDATA } from './needApproveBy.model';
import { OTHERUSERS } from './otherUsers.model';
import { TEMPDOCUMENTS } from './tempDoc.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TempDocService {
  allDocsById:TEMPDOCUMENTS[]; //For get all docs
  checkListData:OTHERUSERS[] //for show checklist data
  needAproveArr:NEEDAPPROVEDATA[]//to get need approve array
  tempDocId:String //this is for delete user from need approvement
  countNeeds;//to get count of need approve array
  countTemp;//to get count of temp docs
  passFileId='';//to set _id for exp date for doc 
  constructor(private http: HttpClient) { }
 
//to get tempory docs by user id
getTempDocs() {
  return this.http.get(environment.apiBaseUrl + '/viewTempFiles');
}

//to delete temp file
deleteCat(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/deleteTempFile/${_id}`);
}

//to rename doc 
renameTempDoc (data){
  return this.http.put(environment.apiBaseUrl+'/renameTemp',data);
}

//to post temp doc to documents 
postToDoc (_id: string){
  return this.http.get(environment.apiBaseUrl+`/transferData/${_id}`);
}
//to get count of temory doc for req id
tempCount(){
  return this.http.get(environment.apiBaseUrl+`/getTempCount`);
}
//send check list data to assaign doc model
getCheckLIst (_id: string){
  return this.http.get(environment.apiBaseUrl+`/getCheckList/${_id}`);
}

//getApprovementData list
getApprovementData(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getApprovementData/${_id}`);
}
//delete user from need approvement array 
delNeedApprove(data){
  return this.http.put(environment.apiBaseUrl+'/delApprovement',data);
}
 // to get count of need approve array 
getApprovementDataCount(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getCountArr/${_id}`);
}
//to set need approvent for doc 
sendNeedApprove(data){
  return this.http.put(environment.apiBaseUrl+'/pushNeedApprove',data);
}

//to set doc expiration date individually
setSingleExpDate(data){
  return this.http.put(environment.apiBaseUrl+`/setExpSingle`,data);
}
//to lock doc
setTlock(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/lockTdoc/${_id}`,data);
}
//to unlock doc
tounlockT(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/unlockTdoc/${_id}`,data);
}
//use for convert utc to now 
getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}

// to get count of need approve array --public--
getCountApprovement(_id){
  this.getApprovementDataCount(_id).subscribe((res) => {
    this.countNeeds= res;
    //console.log(this.countNeeds);
  });
}


}
