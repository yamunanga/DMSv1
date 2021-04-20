import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from 'src/app/shared/date-picker.service';
import { TempDocService } from 'src/app/shared/temp-doc.service';

@Component({
  selector: 'app-picker-popup',
  templateUrl: './picker-popup.component.html',
  styleUrls: ['./picker-popup.component.css']
})
//THIS IS FOR SET EXPIRE DATE FOR TEMPORARY UPLOADED FILE
export class PickerPopupComponent implements OnInit {
  closeResult = '';
  showSucessMessage: boolean;
  serverErrorMessages: string;
  //to set doc expiration date individually data model
  date;
  //this is for get today data 
  model: NgbDateStruct;

  constructor(public datePickerService:DatePickerService,private modalService: NgbModal,public tempDocService:TempDocService,private calendar: NgbCalendar) { }

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
      this.resetData();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.resetData();
      return 'by clicking on a backdrop';
    } else {
      this.resetData();
      return `with: ${reason}`;
    }
}

//to set doc expiration date individually--old--
setExpDateT() {
  this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
  var setDateData={
    id:this.tempDocService.passFileId,
    expDate:this.date
  }
  this.tempDocService.setSingleExpDate(setDateData).subscribe(
   res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 3000);
      this.serverErrorMessages='';
   },
   err => {
      this.serverErrorMessages =err.error;
   },
 );
}

//this is for get today
 selectToday() {
  this.model = this.calendar.getToday();
}

//to set doc expiration date individually working
setExpDate(){
  this.selectToday();
  //console.log(this.model);
  if(this.datePickerService.pickerModel.year >this.model.year ){
    this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
    var setDateData={
      id:this.tempDocService.passFileId,
      expDate:this.date
    }
    this.tempDocService.setSingleExpDate(setDateData).subscribe(
     res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 3000);
        this.serverErrorMessages='';
     },
     err => {
        this.serverErrorMessages =err.error;
     },
   );

  }else if(this.datePickerService.pickerModel.year === this.model.year && this.datePickerService.pickerModel.month > this.model.month){
    this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
    var setDateData={
      id:this.tempDocService.passFileId,
      expDate:this.date
    }
    this.tempDocService.setSingleExpDate(setDateData).subscribe(
     res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 3000);
        this.serverErrorMessages='';
     },
     err => {
        this.serverErrorMessages =err.error;
     },
   );

  }else if(this.datePickerService.pickerModel.year === this.model.year && this.datePickerService.pickerModel.month >= this.model.month && this.datePickerService.pickerModel.day >= this.model.day){
    this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
    var setDateData={
      id:this.tempDocService.passFileId,
      expDate:this.date
    }
    this.tempDocService.setSingleExpDate(setDateData).subscribe(
     res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 3000);
        this.serverErrorMessages='';
     },
     err => {
        this.serverErrorMessages =err.error;
     },
   );

  }
  else{
    this.serverErrorMessages ='Incorect Date !';
  }
}





resetData(){
  this.serverErrorMessages='';

}














}
