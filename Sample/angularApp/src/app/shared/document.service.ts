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

  constructor(private http: HttpClient) { }


//to get all documents name
getDocs(){
    return this.http.get(environment.apiBaseUrl + '/getDocs');
}
   
//to get arc docs
getArcDocs(){
  return this.http.get(environment.apiBaseUrl + '/getArc');
}
//to manually archive doc 
setArcDoc (_id: string){
  return this.http.get(environment.apiBaseUrl+`/toArc/${_id}`);
}

//to get count of document schema
getCountDocs(){
  return this.http.get(environment.apiBaseUrl + '/getCountDocs');
}
//to get count of archive documents schema
getCountArcDocs(){
  return this.http.get(environment.apiBaseUrl + '/getArcCountDocs');
}






}
