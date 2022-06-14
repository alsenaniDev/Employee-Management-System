import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../account/pages/login-Page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
