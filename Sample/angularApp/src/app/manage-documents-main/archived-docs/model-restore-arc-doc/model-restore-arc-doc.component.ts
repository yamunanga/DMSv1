import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ARCDOCUMENTS } from 'src/app/models/archiveDoc.model';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { DocumentService } from 'src/app/shared/document.service';
import { TempDocService } from 'src/app/shared/temp-doc.service';

@Component({
  selector: 'app-model-restore-arc-doc',
  templateUrl: './model-restore-arc-doc.component.html',
  styleUrls: ['./model-restore-arc-doc.component.css']
})
export class ModelRestoreArcDocComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  //to set doc expiration date individually data model
  date;
  //this is for get today data 
  model:NgbDateStruct;
  constructor(public datePickerService:DatePickerService,private modalService: NgbModal,public tempDocService:TempDocService,private calendar: NgbCalendar,public documentService:DocumentService) { }

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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.reset();
      return 'by clicking on a backdrop';
    } else {
      this.reset();
      return `with: ${reason}`;
    }
}

//to set doc expiration date individually working
setExpDate(){
  this.selectToday();
  if(this.datePickerService.pickerModel.year >=this.model.year && this.datePickerService.pickerModel.month >=this.model.month && this.datePickerService.pickerModel.day >this.model.day){
    this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
    var setDateData={
      expDate:this.date
    }
    this.documentService.restoreArc(this.documentService.toPassArcId,setDateData).subscribe(
     res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 3000);
        this.refreshArcDocList();
        this.serverErrorMessages='';
     },
     err => {
        this.serverErrorMessages =err.error;
     },
   );

  }else{
    this.serverErrorMessages ='Incorect Date !';
  }
}


//reset 
reset(){
  this.documentService.toPassArcId='';
}


//this is for get today
selectToday() {
  this.model = this.calendar.getToday();
}
 //to get arc doc list from database
 refreshArcDocList() {
  this.documentService.getArcDocs().subscribe((res) => {
    this.documentService.arcDocs = res as ARCDOCUMENTS[];
  });
  this.documentService.getCountArcDocs().subscribe((res) => {
    this.documentService.countArc= res[0];
  },err => {
    if (err.status === 404) {
      this.documentService.countArc=0;
    }
  }
  );
}

}
