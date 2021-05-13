import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './manage-users-main/register/register.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { NgModule } from '@angular/core';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';
import { OtherUsersComponent } from './other-users/other-users.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { OrganizationComponent } from './organization/organization.component';
import { ManageUsersMainComponent } from './manage-users-main/manage-users-main.component';
import { ManageDocumentsMainComponent } from './manage-documents-main/manage-documents-main.component';
import { AuditComponent } from './audit/audit.component';
import { ViewProfileComponent } from './user-profile/view-profile/view-profile.component';
import { EditPanelProfileComponent } from './user-profile/edit-panel-profile/edit-panel-profile.component';
import { ViewRecivedComponent } from './message-box/view-recived/view-recived.component';
import { ViewSentsComponent } from './message-box/view-sents/view-sents.component';
import { WriteMessageComponent } from './message-box/write-message/write-message.component';
import { ManageDepartmentsComponent } from './organization/manage-departments/manage-departments.component';
import { ManagePositionsComponent } from './organization/manage-positions/manage-positions.component';
import { ArchivedUsersComponent } from './manage-users-main/archived-users/archived-users.component';
import { ViewAdedUsersComponent } from './audit/view-aded-users/view-aded-users.component';
import { ViewTodayArchivedUsersComponent } from './audit/view-today-archived-users/view-today-archived-users.component';
import { ViewTodayAddedDocsComponent } from './audit/view-today-added-docs/view-today-added-docs.component';
import { ViewTodayArchivedDocsComponent } from './audit/view-today-archived-docs/view-today-archived-docs.component';
import { ViewTodayAutoArchivedDocsComponent } from './audit/view-today-auto-archived-docs/view-today-auto-archived-docs.component';
import { ViewTodayAssaignedComponent } from './audit/view-today-assaigned/view-today-assaigned.component';
import { ViewTodayApprovedComponent } from './audit/view-today-approved/view-today-approved.component';
import { ViewTodayNewWorkflowsComponent } from './audit/view-today-new-workflows/view-today-new-workflows.component';
import { ViewTodayEndWorkflowsComponent } from './audit/view-today-end-workflows/view-today-end-workflows.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ArchivedDocsComponent } from './manage-documents-main/archived-docs/archived-docs.component';
import { CategoryAndSubComponent } from './manage-documents-main/category-and-sub/category-and-sub.component';
import { ManageApprovementComponent } from './manage-documents-main/manage-approvement/manage-approvement.component';
import { SubCatOnlyComponent } from './manage-documents-main/sub-cat-only/sub-cat-only.component';
import { UploadDocComponent } from './manage-documents-main/upload-doc/upload-doc.component';
import { ViewDocsComponent } from './manage-documents-main/view-docs/view-docs.component';
import { WorkFlowComponent } from './manage-documents-main/work-flow/work-flow.component';
import { NewWorkflowComponent } from './manage-documents-main/work-flow/new-workflow/new-workflow.component';
import { OldWorkflowComponent } from './manage-documents-main/work-flow/old-workflow/old-workflow.component';
import { ProcessingNowComponent } from './manage-documents-main/work-flow/processing-now/processing-now.component';


export const appRoutes: Routes = [

    {
        path: 'noAuth', component:UserComponent,
        children: [
        { path: 'login',component: SignInComponent},
        { path: 'forget',component:ForgetPasswordComponent},
        ]
    },
    { 
        path: 'activateAccount/:token', component:ActivateAccountComponent
    },
    { 
        path: 'unknown', component:LoginLayoutComponent
    },
    {
        path: 'home', component:HomeLayoutComponent,
        children: [
        { path: 'manageusers',component:ManageUsersMainComponent,canActivate:[AuthGuard],data:['admin'],
            children: [
                { path: 'register', component: RegisterComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'viewusers', component:OtherUsersComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'arcusers', component:ArchivedUsersComponent,canActivate:[AuthGuard],data:['admin']},
            ]
        },
        {path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard],data:['admin','reader','author'],
            children: [
                { path: 'view',component:ViewProfileComponent,canActivate:[AuthGuard],data:['admin','reader','author']},
                { path: 'edit',component:EditPanelProfileComponent,canActivate:[AuthGuard],data:['admin','reader','author']}
        
            ]
        
        },
        {path: 'messagebox', component:MessageBoxComponent,canActivate:[AuthGuard],data:['admin','reader','author'],
            children: [
                { path: 'inbox',component:ViewRecivedComponent,canActivate:[AuthGuard],data:['admin','reader','author']},
                { path: 'sent',component:ViewSentsComponent,canActivate:[AuthGuard],data:['admin','reader','author']},
                { path: 'write',component:WriteMessageComponent,canActivate:[AuthGuard],data:['admin','reader','author']}
            ]
        },
        {path: 'org', component:OrganizationComponent,canActivate:[AuthGuard],data:['admin'],
            children: [
                { path: 'dep',component:ManageDepartmentsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'post',component:ManagePositionsComponent,canActivate:[AuthGuard],data:['admin']}
        
            ]
        },
        {path: 'audit', component:AuditComponent,canActivate:[AuthGuard],data:['admin'],
            children: [
                { path: 'todayusers',component:ViewAdedUsersComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayarcusers',component:ViewTodayArchivedUsersComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todaydocs',component:ViewTodayAddedDocsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayarcdocs',component:ViewTodayArchivedDocsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayautoarcdocs',component:ViewTodayAutoArchivedDocsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayassaigneddocs',component:ViewTodayAssaignedComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayapproveddocs',component:ViewTodayApprovedComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todaynewworkflows',component:ViewTodayNewWorkflowsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'todayendworkflows',component:ViewTodayEndWorkflowsComponent,canActivate:[AuthGuard],data:['admin']}
              
            ]
        },
        {
            path: 'managedocs', component:ManageDocumentsMainComponent,canActivate:[AuthGuard],data:['admin','reader','author'],
            children: [
                { path: 'viewAarcDocs',component:ArchivedDocsComponent,canActivate:[AuthGuard],data:['admin']},
                { path: 'viewCategory',component:CategoryAndSubComponent,canActivate:[AuthGuard],data:['admin','author']},
                { path: 'manageApprove',component:ManageApprovementComponent},
                { path: 'subcategory',component:SubCatOnlyComponent,canActivate:[AuthGuard],data:['admin','author']},
                { path: 'upload',component:UploadDocComponent,canActivate:[AuthGuard],data:['admin','author']},
                { path: 'viewdocs',component:ViewDocsComponent,canActivate:[AuthGuard],data:['admin','reader','author']},
                { path: 'workflowdata',component:WorkFlowComponent,canActivate:[AuthGuard],data:['admin'],
                children: [
                    { path: 'new', component:NewWorkflowComponent,canActivate:[AuthGuard],data:['admin']},
                    { path: 'old', component:OldWorkflowComponent,canActivate:[AuthGuard],data:['admin']},
                    { path: 'processing', component:ProcessingNowComponent,canActivate:[AuthGuard],data:['admin']}
             
                 ]
                }
            ]
        }
      ]
    },
    {
        path: 'resetPassword/:token', component:ResetPasswordTokenComponent
    },
   
    { 
        path: 'forbidden', component: ForbiddenComponent
    },
    {
        path: '', redirectTo: '/noAuth/login', pathMatch: 'full'
    }
  
];
