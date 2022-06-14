import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneFormat } from '../app/core/main/utility/pips/phoneFormat.pipe'
import { RoleBorderDirective } from './core/main/utility/directives/roleBorder.directive';

import { NavbarComponent } from '../app/core/main/utility/common/navbar/navbar.component';
import { SidebarComponent } from '../app/core/main/utility/common/sidebar/sidebar.component';
import { AddUsersComponent } from './core/main/pages/user-Pages/add-users/add-users.component';
import { ShowUsersComponent } from './core/main/pages/user-Pages/show-users/show-users.component';
import { AlertsComponent } from './core/main/utility/common/alerts/alerts.component';
import { SettingsComponent } from './core/main/pages/settings/settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileComponent } from './core/main/pages/profile/profile.component';
import { FormEditComponent } from './core/main/utility/common/form-edit/form-edit.component';
import { GroupSettingModalComponent } from './core/main/components/group-setting-modal/group-setting-modal.component';
import { RoleSettingModalComponent } from './core/main/components/role-setting-modal/role-setting-modal.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
import { AccountLayoutComponent } from './core/layouts/account/account-layout.component';
import { MainLayoutComponent } from './core/layouts/main/main-layout.component';
import { HomeComponent } from './core/main/pages/home-Page/home.component';
import { LoginPageComponent } from './core/account/pages/login-Page/login-page.component';
import { StatsCardComponent } from './core/main/components/stats-card/stats-card.component';
import { InputWarring } from './core/main/utility/directives/InputWarring';
import { PhoneNumberValidation } from './core/main/utility/directives/PhoneNumberValidation';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AddUsersComponent,
    ShowUsersComponent,
    AccountLayoutComponent,
    MainLayoutComponent,
    AlertsComponent,
    ProfileComponent,
    SettingsComponent,
    FormEditComponent,
    GroupSettingModalComponent,
    RoleSettingModalComponent,
    HomeComponent,
    LoginPageComponent,
    StatsCardComponent,
    PhoneFormat,
    InputWarring,
    PhoneNumberValidation,
    RoleBorderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    TableModule,
    ToastModule,
    MultiSelectModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ConfirmDialogModule,
    AccordionModule,
    ToolbarModule,
    CalendarModule,
    ProgressBarModule,
    FileUploadModule,
    RadioButtonModule,
    InputNumberModule,
    HttpClientModule
  ],
  providers: [MessageService, ConfirmationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
