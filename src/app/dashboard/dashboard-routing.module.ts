import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { ShowUsersComponent } from '../components/show-users/show-users.component';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from '../components/settings/settings.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }],
}, {
  path: 'admin', component: AdminPageComponent
}, {
  path: 'add', component: AddUsersComponent
}, {
  path: 'show', component: ShowUsersComponent
}, {
  path: 'settings', component: SettingsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
