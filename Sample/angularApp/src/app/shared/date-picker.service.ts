import { Injectable } from '@angular/core';
import { PICKMODEL } from '../models/datePicker.model';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  pickerModel:PICKMODEL;
  constructor() { }
}
