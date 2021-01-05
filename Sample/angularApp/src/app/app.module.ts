//built in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbdModalBasic } from './user-profile/modal-basic/modal-basic.component';
import { ModalChangePassComponent } from './user-profile/modal-change-pass/modal-change-pass.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';
import { ModalChangeRoleComponent } from './user-profile/modal-change-role/modal-change-role.component';
import { HomeComponent } from './home/home.component';
import { OtherUsersComponent } from './other-users/other-users.component';
import { ModelForOtherUserRoleComponent } from './other-users/model-for-other-user-role/model-for-other-user-role.component';
import { ManageDocsComponent } from './manage-docs/manage-docs.component';
import { ViewDocsComponent } from './view-docs/view-docs.component';
//routes
import { appRoutes } from './routes';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchivedUsersComponent } from './archived-users/archived-users.component';










@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    UserProfileComponent,
    SignInComponent,
    UpdateProfileComponent,
    ForbiddenComponent,
    ActivateAccountComponent,
    ForgetPasswordComponent,
    ResetPasswordTokenComponent,
    NgbdModalBasic,
    ModalChangePassComponent,
    ModalChangeRoleComponent,
    HomeComponent,
    OtherUsersComponent,
    ModelForOtherUserRoleComponent,
    ManageDocsComponent,
    ViewDocsComponent,
    ArchivedUsersComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],//,{provide:LocationStrategy,useClass:HashLocationStrategy} because every url has #
  bootstrap: [AppComponent]
})
export class AppModule { }