import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  visible=true;
  sideNavCls='sidenav';
  constructor() { }

activeNav(){
    this.visible=true;
}

disableNav(){
  this.visible=false;
}

//change ng class to list
changeCls(){
  this.sideNavCls='sidenav';
}
changeClsDefault(){
  this.sideNavCls='sidenav2';
}

}
