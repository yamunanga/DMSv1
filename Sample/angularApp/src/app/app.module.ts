//built in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPrintModule} from 'ngx-print';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './manage-users-main/register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbdModalBasic } from './user-profile/modal-basic/modal-basic.component';
import { ModalChangePassComponent } from './user-profile/modal-change-pass/modal-change-pass.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';
import { ModalChangeRoleComponent } from './user-profile/modal-change-role/modal-change-role.component';
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
import { UploadDocComponent } from './manage-documents-main/upload-doc/upload-doc.component';
import { CategoryAndSubComponent } from './manage-documents-main/category-and-sub/category-and-sub.component';
import { ModelChangeDepComponent } from './user-profile/model-change-dep/model-change-dep.component';
import { ModelChangePostComponent } from './user-profile/model-change-post/model-change-post.component';
import { SubCatOnlyComponent } from './manage-documents-main/sub-cat-only/sub-cat-only.component';
import { ModelAssaignDocComponent } from './manage-documents-main/upload-doc/model-assaign-doc/model-assaign-doc.component';
import { ManageApprovementComponent } from './manage-documents-main/manage-approvement/manage-approvement.component';
import { RejectPopupModelComponent } from './manage-documents-main/manage-approvement/reject-popup-model/reject-popup-model.component';
import { DataPickerComponent } from './data-picker/data-picker.component';
import { PickerPopupComponent } from './data-picker/picker-popup/picker-popup.component';
import { ArchivedDocsComponent } from './manage-documents-main/archived-docs/archived-docs.component';
import { ModelSetPassComponent } from './manage-documents-main/upload-doc/model-set-pass/model-set-pass.component';
import { ModelUnlockComponent } from './manage-documents-main/upload-doc/model-unlock/model-unlock.component';
import { ModelRestoreArcDocComponent } from './manage-documents-main/archived-docs/model-restore-arc-doc/model-restore-arc-doc.component';
import { ModelWorkflowComponent } from './manage-documents-main/upload-doc/model-workflow/model-workflow.component';
import { WorkFlowComponent } from './manage-documents-main/work-flow/work-flow.component';
import { NewWorkflowComponent } from './manage-documents-main/work-flow/new-workflow/new-workflow.component';
import { OldWorkflowComponent } from './manage-documents-main/work-flow/old-workflow/old-workflow.component';
import { ModelDocUpdateComponent } from './manage-documents-main/work-flow/new-workflow/model-doc-update/model-doc-update.component';
import { ModelViewListComponent } from './manage-documents-main/work-flow/new-workflow/model-view-list/model-view-list.component';
import { ModelSentMsgComponent } from './message-box/model-sent-msg/model-sent-msg.component';
import { ProcessingNowComponent } from './manage-documents-main/work-flow/processing-now/processing-now.component';
import { ModelViewOldListComponent } from './manage-documents-main/work-flow/old-workflow/model-view-old-list/model-view-old-list.component';
import { EditPanelProfileComponent } from './user-profile/edit-panel-profile/edit-panel-profile.component';
import { ViewProfileComponent } from './user-profile/view-profile/view-profile.component';
import { AuditComponent } from './audit/audit.component';
import { ViewAdedUsersComponent } from './audit/view-aded-users/view-aded-users.component';
import { ViewTodayArchivedUsersComponent } from './audit/view-today-archived-users/view-today-archived-users.component';
import { ViewTodayAddedDocsComponent } from './audit/view-today-added-docs/view-today-added-docs.component';
import { ViewTodayArchivedDocsComponent } from './audit/view-today-archived-docs/view-today-archived-docs.component';
import { ViewTodayAssaignedComponent } from './audit/view-today-assaigned/view-today-assaigned.component';
import { ViewTodayApprovedComponent } from './audit/view-today-approved/view-today-approved.component';
import { ViewTodayNewWorkflowsComponent } from './audit/view-today-new-workflows/view-today-new-workflows.component';
import { ViewTodayEndWorkflowsComponent } from './audit/view-today-end-workflows/view-today-end-workflows.component';
import { ViewTodayAutoArchivedDocsComponent } from './audit/view-today-auto-archived-docs/view-today-auto-archived-docs.component';
import { NavigationService } from './shared/navigation.service';
import { NavigationComponent } from './navigation/navigation.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { TestNavComponent } from './test-nav/test-nav.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { RenameModelComponent } from './manage-documents-main/view-docs/rename-model/rename-model.component';










@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    UserProfileComponent,
    SignInComponent,
    ForbiddenComponent,
    ActivateAccountComponent,
    ForgetPasswordComponent,
    ResetPasswordTokenComponent,
    NgbdModalBasic,
    ModalChangePassComponent,
    ModalChangeRoleComponent,
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
    UploadDocComponent,
    CategoryAndSubComponent,
    ModelChangeDepComponent,
    ModelChangePostComponent,
    SubCatOnlyComponent,
    ModelAssaignDocComponent,
    ManageApprovementComponent,
    RejectPopupModelComponent,
    DataPickerComponent,
    PickerPopupComponent,
    ArchivedDocsComponent,
    ModelSetPassComponent,
    ModelUnlockComponent,
    ModelRestoreArcDocComponent,
    ModelWorkflowComponent,
    WorkFlowComponent,
    NewWorkflowComponent,
    OldWorkflowComponent,
    ModelDocUpdateComponent,
    ModelViewListComponent,
    ModelSentMsgComponent,
    ProcessingNowComponent,
    ModelViewOldListComponent,
    EditPanelProfileComponent,
    ViewProfileComponent,
    AuditComponent,
    ViewAdedUsersComponent,
    ViewTodayArchivedUsersComponent,
    ViewTodayAddedDocsComponent,
    ViewTodayArchivedDocsComponent,
    ViewTodayAssaignedComponent,
    ViewTodayApprovedComponent,
    ViewTodayNewWorkflowsComponent,
    ViewTodayEndWorkflowsComponent,
    ViewTodayAutoArchivedDocsComponent,
    NavigationComponent,
    MainNavComponent,
    LoginLayoutComponent,
    TestNavComponent,
    HomeLayoutComponent,
    RenameModelComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgxPrintModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,NavigationService],//,{provide:LocationStrategy,useClass:HashLocationStrategy} because every url has #
  bootstrap: [AppComponent]
})
export class AppModule { }
