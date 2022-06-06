import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/common/navbar/navbar.component';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { ShowUsersComponent } from './components/users/show-users/show-users.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AlertsComponent } from './components/common/alerts/alerts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteModalComponent } from './components/common/delete-modal/delete-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormEditComponent } from './components/common/form-edit/form-edit.component';
import { ShowModalComponent } from './components/common/show-modal/show-modal.component';
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




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    AddUsersComponent,
    ShowUsersComponent,
    LoginLayoutComponent,
    DashboardLayoutComponent,
    AlertsComponent,
    ProfileComponent,
    SettingsComponent,
    DeleteModalComponent,
    FormEditComponent,
    ShowModalComponent,

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
    InputNumberModule
  ],
  providers: [MessageService, ConfirmationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
