import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { WORKFLOWDATA } from '../models/workFlow.model';
import { WORKFLOWDATALiST } from '../models/workflowList.model';
import { DOCUMENTS } from './document.model';
import { OTHERUSERS } from './otherUsers.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  checkListData:OTHERUSERS[] //for show checklist data
  workflowArr:WORKFLOWDATA[] //for get workflow array data
  workflowDataList:WORKFLOWDATALiST[] //for get workflow data to front end acording to user
  workflowDataCount;//for get workflow data count  acording to user
  workflowArrCount;//for get count of workflow arr 
  passWorkflowId='';//for lock and unlock doc
  path='';//this is for document path
  workId;//this is for document id
  workflowUserList;//this is for work flow list model
  workflowNext:string;//this is for work flow list model
  workflowNow:string;//this is for work flow list model
  workflowProcessing:WORKFLOWDATALiST[];//this is for workflow processing
  workflowProcessingC=0;//this is for get workflow processing count
  passWorkProcessId='';//for use workflow data in workflow table 
  workflowOldList:DOCUMENTS[];//to get workflow done files acording to user
  workflowOldDataCount=0;//to get workflow done files count acording to user
  workflowOldUsers;//to get workflow done users
  constructor(private http: HttpClient) { }
  
//for pass admin users for select workflow
getUsersWork() {
    return this.http.get(environment.apiBaseUrl + '/userForWork');
  }
//to add user to workflow for temp doc
addUserWork(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/chkWorkflow/${_id}`,data);
}
//for get workflow array data 
getWorkflowData(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowData/${_id}`);
}
 //for get workflow data array length 
getWorkflowDataLen(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataLen/${_id}`);
}
//for get workflow data to front end acording to user
getWorkflowDataList(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowData`);
}

//to get workflow data count acording to user id
getWorkflowDataListCount(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataCount`);
}


//to delete user from workflow for temp doc
delUserWork(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/delWorkflowUser/${_id}`,data);
}
//to lock doc
setlockWork(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/lockWorkFile/${_id}`,data);
}
//to unlock doc
tounlockWork(_id:string,data){
  return this.http.put(environment.apiBaseUrl+`/unlockWorkFile/${_id}`,data);
}

//to update document in workflow
updateWorkDoc(path:string,data){
  return this.http.put(environment.apiBaseUrl+`/postWorkflowFile/${path}`,data);
}

//to rename workflow file

renameWorkFile(data){
  return this.http.put(environment.apiBaseUrl+`/renameWorkflowFile`,data);
}

//to validate workflow file 
validateFile(_id:string){
  return this.http.get(environment.apiBaseUrl+`/toWorkflow/${_id}`);
}

//to pass ongoing workflow data for creator of workflow
getWorkflowDataNow(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataNow`);
}
//to pass ongoing workflow data count for creator of workflow
getWorkflowDataNowCount(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataNowCount`);
}

//to delete workflow  
delWorkflow(_id:string){
  return this.http.delete(environment.apiBaseUrl+`/delWorkflow/${_id}`);
}
//to add user to workflow in workflow table
addUserWorkInWork(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/addWorkflowInWork/${_id}`,data);
}
//to remove user from workflow  in workflow table
delUserWorkInWork(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/delWorkflowUserInWork/${_id}`,data);
}

//for get workflow array data in workflow
getWorkflowDataInWork(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataInWork/${_id}`);
}
//to update workflow table when change workflow data
getWorkflowDataUpdate(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDataUpdate/${_id}`);
}
//to get workflow done files acording to user
getWorkflowDoneFiles(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDoneFiles`);
}
//to  get workflow done files count acording to user
getWorkflowDoneFilesCount(){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDoneFilesCount`);
}
//to del workflow done file acording to user
getWorkflowDoneFileDel(_id: string){
  return this.http.get(environment.apiBaseUrl+`/getWorkflowDoneFileDel/${_id}`);
}

getDate(date){
  var stillUtc = moment.utc(date).toDate();
  var currentTime= moment(stillUtc).local().format('MMMM Do YYYY, h:mm:ss a');
  return currentTime;
}
}
