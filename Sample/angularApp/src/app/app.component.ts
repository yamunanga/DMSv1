import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CategoryService } from './shared/category.service';
import { MessageServiceService } from './shared/message-service.service';
import { NavigationService } from './shared/navigation.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DMSv1.0';
  constructor(private titleService: Title) { 
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    
  }





}
