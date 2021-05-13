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
  countArc;//for archived doc count
  toPassDocId='empty';//this is for lock/unlock 
  toPassArcId='empty';//this is for set arc date
  findDocForCat;//for search
  findDocForDep;//for search
  docId;//This is rename document
  updatePath='';//this for document update
 //docTypes=["pdf","doc","docx","odt","pdf","xls","xlsx","ods","ppt","pptx","txt","jpg","jpeg","png"];
  docTypes;
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
//to update document/file
updateFile(path:string,data){
  return this.http.put(environment.apiBaseUrl+`/updateFile/${path}`,data);
}
//to unlock doc
tounlockDoc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/unlockDoc/${_id}`,data);
}
//to lock doc
setlockDoc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/lockDoc/${_id}`,data);
}
//for extend doc expiration date
extendExp(data){
  return this.http.put(environment.apiBaseUrl+`/extendExp`,data);
}


//to get count of archive documents schema
getCountArcDocs(){
  return this.http.get(environment.apiBaseUrl + '/getArcCountDocs');
}

//to rename file name
toRenameFile(data){
  return this.http.put(environment.apiBaseUrl+`/renameFile`,data);
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
//to auto archive doc 
setAutoArcDoc (){
  return this.http.get(environment.apiBaseUrl+`/chkDocs`);
}

//to manually restore doc
restoreArc(_id: string,data){
  return this.http.put(environment.apiBaseUrl+`/fromArc/${_id}`,data);
}
//to delete arc doc
delArcDoc (_id: string){
  return this.http.get(environment.apiBaseUrl+`/delArcFile/${_id}`);
}

//filter docs acording to department
findDocsForDep (_id: string){
  return this.http.get(environment.apiBaseUrl+`/findDocsForDep/${_id}`);
}
//filter docs acording to category
findDocsForCat(_id: string){
  return this.http.get(environment.apiBaseUrl+`/findDocsForCat/${_id}`);
}
//findDocsTypes
getDocTypes(){
  return this.http.get(environment.apiBaseUrl + '/findDocsTypes');
}

//to auto archive docs
getAutoArc(){
  this.setAutoArcDoc().subscribe((res) => {
   //console.log('done');
  }
  );
 
}


}
