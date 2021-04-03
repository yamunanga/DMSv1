import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { DOCUMENTS } from './document.model';
import { ARCDOCUMENTS } from '../models/archiveDoc.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  allDocs:DOCUMENTS[]; //For get all docs
  arcDocs:ARCDOCUMENTS[];//For get archived docs
  toPassDocId='';//this is for lock/unlock 
  toPassArcId='';//this is for set arc date
  constructor(private http: HttpClient) { }


//to get all documents name
getDocs(){
    return this.http.get(environment.apiBaseUrl + '/getDocs');
}
   
//to get count of document schema
getCountDocs(){
  return this.http.get(environment.apiBaseUrl + '/getCountDocs');
}

//to delete document/file from list
deleteDoc(_id: string) {
  return this.http.delete(environment.apiBaseUrl + `/delDoc/${_id}`);
}

//to unlock doc
tounlockDoc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/unlockDoc/${_id}`,data);
}
//to lock doc
setlockDoc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/lockDoc/${_id}`,data);
}



//to get count of archive documents schema
getCountArcDocs(){
  return this.http.get(environment.apiBaseUrl + '/getArcCountDocs');
}

//----Archive docs----

//to get arc docs
getArcDocs(){
  return this.http.get(environment.apiBaseUrl + '/getArc');
}
//to manually archive doc 
setArcDoc (_id: string){
  return this.http.get(environment.apiBaseUrl+`/toArc/${_id}`);
}
//to manually restore doc
restoreArc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/fromArc/${_id}`,data);
}




}
