import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(public datePickerService:DatePickerService,private modalService: NgbModal,public tempDocService:TempDocService) { }

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
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
}

//to set doc expiration date individually
setExpDate() {
  this.date=this.datePickerService.pickerModel.year.toString()+'-'+this.datePickerService.pickerModel.month.toString()+'-'+this.datePickerService.pickerModel.day.toString();
  this.tempDocService.setSingleExpDate(this.tempDocService.passFileId,this.date).subscribe(
   res => {
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 3000);
   },
   err => {
     this.serverErrorMessages = err.error;
   },
 );
}

















}
