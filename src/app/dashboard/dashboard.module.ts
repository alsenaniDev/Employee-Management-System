import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
