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
import { RegisterComponent } from './manage-users-main/register/register.component';
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
import { ManageDocsComponent } from './manage-documents-main/manage-docs/manage-docs.component';
import { ViewDocsComponent } from './manage-documents-main/view-docs/view-docs.component';
import { ArchivedUsersComponent } from './manage-users-main/archived-users/archived-users.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { WriteMessageComponent } from './message-box/write-message/write-message.component';
import { ViewSentsComponent } from './message-box/view-sents/view-sents.component';
import { ViewRecivedComponent } from './message-box/view-recived/view-recived.component';
import { ModelViewComponent } from './message-box/view-recived/model-view/model-view.component';
import { ModelViewSentsComponent } from './message-box/view-sents/model-view-sents/model-view-sents.component';
import { PopupUserprofileComponent } from './popup-userprofile/popup-userprofile.component';
import { OrganizationComponent } from './organization/organization.component';
import { ManageDepartmentsComponent } from './organization/manage-departments/manage-departments.component';
import { ManagePositionsComponent } from './organization/manage-positions/manage-positions.component';
import { ManageUsersMainComponent } from './manage-users-main/manage-users-main.component';
import { ManageDocumentsMainComponent } from './manage-documents-main/manage-documents-main.component';



//routes
import { appRoutes } from './routes';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';









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
    MessageBoxComponent,
    WriteMessageComponent,
    ViewSentsComponent,
    ViewRecivedComponent,
    ModelViewComponent,
    ModelViewSentsComponent,
    PopupUserprofileComponent,
    OrganizationComponent,
    ManageDepartmentsComponent,
    ManagePositionsComponent,
    ManageUsersMainComponent,
    ManageDocumentsMainComponent,
  
   
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
