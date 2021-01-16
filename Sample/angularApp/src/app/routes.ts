import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './manage-users-main/register/register.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import{UpdateProfileComponent} from './update-profile/update-profile.component'
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { NgModule } from '@angular/core';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';
import { HomeComponent } from './home/home.component';
import { OtherUsersComponent } from './other-users/other-users.component';


export const appRoutes: Routes = [
    /*{
        path: 'register', component: UserComponent,
        children: [{ path: '', component: RegisterComponent }]
    },*/
    {
        path: 'register',component: RegisterComponent,canActivate:[AuthGuard],data:['admin']
    }
    ,
    /*{
        path: 'register', component: UserComponent,
        children: [{ path: '', component: RegisterComponent,canActivate:[AuthGuard],data:['admin']}]
    },*/
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'forgetPassword', component: UserComponent,
        children: [{ path: '',component:ForgetPasswordComponent}]
    },
    {
        path: 'resetPassword/:token', component:ResetPasswordTokenComponent
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard],data:['admin','reader','author']
    },
    {
        path: 'home', component: HomeComponent,//canActivate:[AuthGuard],data:['admin','reader','author']
    },
    {
        path: 'userList', component:OtherUsersComponent,canActivate:[AuthGuard],data:['admin']
    },
   /* {
        path: 'register', component: UserProfileComponent,
        children: [{ path: '', component:ModalPopupComponent,canActivate:[AuthGuard],data:['admin','reader']}]

    },*/
    { 
        path: 'forbidden', component: ForbiddenComponent//,canActivate: [AuthGuard] ,data:['reader']
    },
    {
        path: 'updateprofile', component:UpdateProfileComponent,canActivate:[AuthGuard],data:['admin']
    },
    {
        path: 'activateAccount/:token', component:ActivateAccountComponent
    },
    
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
  
];
