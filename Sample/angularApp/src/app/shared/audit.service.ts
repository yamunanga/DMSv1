import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { OTHERUSERS } from './otherUsers.model';
import { ARCHIVEDUSERS } from './archivedUsers.model';
import { DOCUMENTS } from './document.model';
import { ARCDOCUMENTS } from '../models/archiveDoc.model';
import { WORKFLOWDATALiST } from '../models/workflowList.model';
import { NEEDAPPROVEDATA } from './needApproveBy.model';
import { NEEDAPPROVEDOCS } from './approvementData.model';
@Injectable({
  providedIn: 'root'
})
export class AuditService {
  
  allUsersToday:OTHERUSERS[]; //For get the users
  allArcUsersToday:ARCHIVEDUSERS[];//For get arc users
  allAddedDocs:DOCUMENTS[];//For get today added documents
  allAddedArcDocs:ARCDOCUMENTS[];//For get today arc documents
  allAddedAutoArcDocs:ARCDOCUMENTS[];//For get today manual arc documents
  allAssaignDocs:NEEDAPPROVEDOCS[];//for get today assaign documents
  allWorkflowToday:WORKFLOWDATALiST[];//for get today aded workflow documents
  allApprovedDocsToday:DOCUMENTS[];//for get today approved docs
  allTodayEndWorkflow:WORKFLOWDATALiST[];//for get today ended workflow list
  constructor(private http: HttpClient) { }

  //to pass today aded users
  getTodayUsers() {
    return this.http.get(environment.apiBaseUrl + '/getTodayUsers');
  }
  //to pass today aded users count
  getTodayUsersC() {
    return this.http.get(environment.apiBaseUrl + '/getUsersTodayCount');
  }
  //to pass today archived users
  getTodayArcUsers() {
    return this.http.get(environment.apiBaseUrl + '/getTodayArcUsers');
  }
  //to pass today archived users count
  getTodayArcUsersCount() {
    return this.http.get(environment.apiBaseUrl + '/getArcUsersTodayCount');
  }
  //to pass today created  docs
  getTodayAdedDocs() {
    return this.http.get(environment.apiBaseUrl + '/getDocsToday');
  }
  //to pass today created  docs count
  getTodayAdedDocsCount() {
    return this.http.get(environment.apiBaseUrl + '/getDocsTodayCount');
  }
  //to pass today manual archived docs
  getTodayAdedArcDocs() {
    return this.http.get(environment.apiBaseUrl + '/getArcDocsToday');
  }
  //to pass today manual archived docs count
  getTodayAdedArcDocsCount() {
    return this.http.get(environment.apiBaseUrl + '/getArcDocsTodayCount');
  }
 //to pass today automatic archived docs
 getTodayAutoArcDocs() {
  return this.http.get(environment.apiBaseUrl + '/getArcDocsTodayAuto');
 }
 //to pass today automatic archived docs count
 getTodayAutoArcDocsCount() {
  return this.http.get(environment.apiBaseUrl + '/getArcDocsTodayAutoCount');
 }
 //to pass today assaigned documents
 getTodayAssaignedDocs() {
  return this.http.get(environment.apiBaseUrl + '/getAssaignedDocsToday');
 }
 //to pass today assaigned documents count
 getTodayAssaignedDocsCount() {
  return this.http.get(environment.apiBaseUrl + '/getAssaignedDocsTodayCount');
 }
 //to pass today workflowed documents
 getWorkflowedDocsToday() {
  return this.http.get(environment.apiBaseUrl + '/getWorkflowedDocsToday');
 }
 //to pass today workflowed documents count
 getWorkflowedDocsTodayCount() {
  return this.http.get(environment.apiBaseUrl + '/getWorkflowedDocsTodayCount');
 }
 //to pass today approved documents 
 getApprovedDocsToday() {
  return this.http.get(environment.apiBaseUrl + '/getApprovedDocsToday');
 }
 //to pass today approved documents count
 getApprovedDocsTodayCount() {
  return this.http.get(environment.apiBaseUrl + '/getApprovedDocsTodayCount');
 }
//to pass today ended workflow data
getWorkflowedEndDocsToday() {
  return this.http.get(environment.apiBaseUrl + '/getWorkflowedDocsTodayEnd');
 }
//to pass today ended workflow data count
getWorkflowedEndDocsTodayCount() {
  return this.http.get(environment.apiBaseUrl + '/getWorkflowedDocsEndTodayCount');
 }


}
