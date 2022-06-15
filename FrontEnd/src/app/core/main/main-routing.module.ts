import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './pages/user-Pages/add-user/add-users.component';
import { ShowUsersComponent } from './pages/user-Pages/show-users/show-users.component';
import { HomeComponent } from './pages/home-Page/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  }, {
    path: 'add-users', component: AddUsersComponent
  }, {
    path: 'show-users', component: ShowUsersComponent
  }, {
    path: 'settings', component: SettingsComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
