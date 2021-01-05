import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { DOCUMENTS } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  allDocs:DOCUMENTS[]; //For get all docs


  constructor(private http: HttpClient) { }


//to get all documents name
   getDocs(){
    return this.http.get(environment.apiBaseUrl + '/getDocs');
  }
   



}
