import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { nextTick } from 'process';
import { NavigationService } from '../shared/navigation.service';
//import { profile } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   

  constructor(private userService : UserService,private router : Router ,private  navigationService: NavigationService){} //,private profile:UserProfileComponent
  user={
    role:localStorage.getItem('userRole')
  };
  //subInfo=this.userService. getRoleInfo().subscribe((res) => {this.user = res['user'] ;}) //For get to user info from backend
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if ((!this.userService.isLoggedIn() )){
        this.router.navigateByUrl('/noAuth/login');
        this.userService.deleteToken();
        localStorage.removeItem('userRole');
        return false;
      }else{
         if((next.data[0]==this.user.role) || (next.data[1]==this.user.role)|| (next.data[2]==this.user.role)){
          return true;
         }else{
            this.router.navigateByUrl('/forbidden');
            return false;
          
         }
      }
      
  } 
}

/* DEFAULT !
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn() ) {
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
  */

  //Code affection Role
 /*
 canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userService.isLoggedIn() ) {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          var match = this.profile.roleMatch(roles);
          if (match) return true;
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
  }
  */
 /*
if(next.data[0]==this.user.role){
  return true;
}else{
  return false;
}
*/
//my code
/*
export class AuthGuard implements CanActivate {
   

  constructor(private userService : UserService,private router : Router ){} //,private profile:UserProfileComponent
  user={
    role:localStorage.getItem('userRole')
  };
  //subInfo=this.userService. getRoleInfo().subscribe((res) => {this.user = res['user'] ;}) //For get to user info from backend
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if ((!this.userService.isLoggedIn() )){
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }else{
         if((next.data[0]==this.user.role) || (next.data[1]==this.user.role)){
          return true;
         }else{
          //this.router.navigateByUrl('/forbidden');
          return false;
         }
      }
      
  } 
}
*/