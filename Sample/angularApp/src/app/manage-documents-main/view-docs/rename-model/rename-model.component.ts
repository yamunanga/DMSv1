import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons,NgbCalendar,NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { DOCUMENTS } from 'src/app/shared/document.model';
import { DocumentService } from 'src/app/shared/document.service';
import { WorkflowService } from 'src/app/shared/workflow.service';

@Component({
  selector: 'app-rename-model',
  templateUrl: './rename-model.component.html',
  styleUrls: ['./rename-model.component.css']
})
export class RenameModelComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  showSucessMessage1: boolean;
  serverErrorMessages1: string;
  showSucessMessage2: boolean;
  serverErrorMessages2: string;
  isClicked=false;
  workName='';//ng model for rename
  docFile;//this is for uploading updated  file
  //this is for rename data
  renameData={
    _id:'',
    name:''
  }
  //to set doc expiration date individually data model
  date;
   //this is for get today data 
  model:NgbDateStruct;
  newPath:string;//this is for upload path conversion
  @ViewChild('takeInput', {static: false}) InputVar: ElementRef;
  constructor(private calendar: NgbCalendar,public datePickerService:DatePickerService,public workflow:WorkflowService,public documentService:DocumentService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.reset();
      this.workName='';
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.reset();
      this.workName='';
      return 'by clicking on a backdrop';
    } else {
      this.reset();
      this.workName='';
      return `with: ${reason}`;
    }
  }

//This is for select file event
selectSingleFile(event){
  if (event.target.files.length > 0) {
    this.isClicked=true;
    const file = event.target.files[0];
    this.docFile=file;
  }
}
//this is for update doc 
onSend(){
  const formData = new FormData();
  formData.append('file',this.docFile);
  formData.append('id',this.documentService.docId);
  var path=this.conPath(this.documentService.updatePath);
  this.documentService.updateFile(path,formData).subscribe(
    res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetNativeElement();
        this.refreshDocList()
        this.reset();
    },
    err => {
        this.serverErrorMessages = err.error;
      
    },
  );
}
//to convert  file upload location to text
conPath(path){
  var str=path.split('/');
  this.newPath=''
  for(var i=0;i<str.length;i++){
    this.newPath=this.newPath+str[i]+'-'
  }
 return this.newPath
}

 //to rename work file
  toRename(){
    this.renameData={
      _id:this.documentService.docId,
      name:this.workName
    }
    this.documentService.toRenameFile(this.renameData).subscribe(
      res => {
          this.showSucessMessage1 = true;
          setTimeout(() => this.showSucessMessage1 = false, 4000);
          this.workName='';
          this.serverErrorMessages1='';
          this.refreshDocList();
      },
      err => {
          this.serverErrorMessages1= err.error;
        
      },
    );
  }
  reset(){
    this.isClicked=false;
  }

  refreshDocList() {
    this.documentService.getDocs().subscribe((res) => {
      this.documentService.allDocs = res as DOCUMENTS[];
    });
  }
//reset native element
resetNativeElement(){
  this.InputVar.nativeElement.value = ""; 
}

//to set doc expiration date individually working
setExpDate(){
  this.selectToday();
  if(this.datePickerService.pickerModel.year >=this.model.year && this.datePickerService.pickerModel.month >=this.model.month && this.datePickerService.pickerModel.day >this.model.day){
    this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
    var setDateData={
      _id:this.documentService.docId,
      expDate:this.date
    }
    this.documentService.extendExp(setDateData).subscribe(
     res => {
        this.showSucessMessage2 = true;
        setTimeout(() => this.showSucessMessage2 = false, 3000);
        this.refreshDocList();
        this.serverErrorMessages2='';
     },
     err => {
        this.serverErrorMessages2 =err.error;
     },
   );

  }else{
    this.serverErrorMessages2 ='Incorect Date !';
  }
}

//this is for get today
selectToday() {
  this.model = this.calendar.getToday();
}

}
