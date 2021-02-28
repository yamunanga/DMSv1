import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { PICKMODEL } from '../models/datePicker.model';
import { DatePickerService } from '../shared/date-picker.service';

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent implements OnInit {

  constructor(public datePickerService:DatePickerService) { }

  ngOnInit(): void {
     this.datePickerService.pickerModel=new PICKMODEL();
  }
  
 // model: NgbDateStruct;
}
