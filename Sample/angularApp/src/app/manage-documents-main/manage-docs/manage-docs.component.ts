import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { DocumentService } from '../../shared/document.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-manage-docs',
  templateUrl: './manage-docs.component.html',
  styleUrls: ['./manage-docs.component.css']
})


export class ManageDocsComponent implements OnInit {
  showSucessMessage: string;
  serverErrorMessages: string;
  docName;//ng model for document name
  doc;//property for selected files
  categoryName;//ng model for category name
  departmentName;//ng model for department name
  progressTorF=0;//this is for determin progress status 
  tags;//ng model for tags
  percentDone;//for the progress bar
  // ViewChild is used to access the input element. 
   @ViewChild('takeInput', {static: false}) 
  // this InputVar is a reference to our input. 
  InputVar: ElementRef; 
   

  constructor(public documentService:DocumentService,private http: HttpClient,private toastr: ToastrService,private userService: UserService) { }

  ngOnInit(): void {
    this.resetForm();
    this.userService.getUserdetailes();
  }
  /*onSubmit(form: NgForm) {
    this.documentService.postFile(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        //this.resetForm(form);
      },
      err => {
          this.serverErrorMessages = err.error.join('<br/>');
        
      },
    );
  }*/



  selectFile(event) {
    if (event.target.files.length > 0) {
       const file = event.target.files[0];
       this.doc =file;
       this.percentDone =0;
    }
  }


/*
  onSubmit(){
    const formData = new FormData();
    formData.append('name', this.docName);
    formData.append('file', this.doc);
    formData.append('department', this.departmentName);
    formData.append('category', this.categoryName);
    formData.append('tags', this.tags);
    this.http.post<any>(environment.apiBaseUrl+'/postDoc', formData).subscribe(
      (res) => this.toastr.success(res),
      (err) =>this.toastr.error(this.serverErrorMessages = err.error.join('<br/>'))
    );
    this.clearFormData(formData);
    this.resetForm();
  }
*/

  onSubmit(){
    this.percentDone =0;
    const formData = new FormData();
    formData.append('name', this.docName);
    formData.append('file', this.doc);
    formData.append('department', this.departmentName);
    formData.append('category', this.categoryName);
    formData.append('tags', this.tags);
    formData.append('createdBy',this.userService.userDetails.email);
    this.http.post<any>(environment.apiBaseUrl+'/postDoc', formData,{
      reportProgress: true,
      //responseType: 'json',
      observe : 'events'
    }).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
         
        }
        else if (event instanceof HttpResponse) {
           this.toastr.success("File Uploaded Successfully !"); 
        }
      },

      (err) =>{
        this.percentDone =0;
        this.toastr.error(this.serverErrorMessages = err.error.join('<br/>'))
      }
   );
    this.clearFormData(formData);
    this.resetForm();
  }

 
//setTimeout(() => this.showSucessMessage = false, 4000);
 // progressTorF
/*
 onSubmit(){
  const formData = new FormData();
  formData.append('name', this.docName);
  formData.append('file', this.doc);
  formData.append('department', this.departmentName);
  formData.append('category', this.categoryName);
  formData.append('tags', this.tags);
  this.http.post<any>(environment.apiBaseUrl+'/postDoc', formData,{
    reportProgress: true,
  }).subscribe(
    (res) => {
     // this.showSucessMessage ="Uploading ....";
      this.toastr.success(res);
    },

    (err) =>{
      this.toastr.error(this.serverErrorMessages = err.error.join('<br/>'))
    }
 );
  this.clearFormData(formData);
  this.resetForm();
}
*/




 resetForm(){
   this.docName='',
   this.departmentName='',
   this.categoryName='',
   this.tags='',
   this.progressTorF=0;
   this.showSucessMessage ="";
   this.percentDone=0;
   // We will clear the value of the input  
   // field using the reference variable.
   this.InputVar.nativeElement.value = ""; 
 }






 //To clear the form data
 clearFormData( fd )
 {
   for( var prop in fd )
   {
     if ( typeof fd[ prop ] != "function" )
     {
       fd[ prop ] = "";
     }
   }
 }


}

