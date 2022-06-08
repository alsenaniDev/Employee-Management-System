import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './core/layouts/account/account-layout.component';
import { MainLayoutComponent } from './core/layouts/main/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    loadChildren: () => import('./core/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'login',
    component: AccountLayoutComponent,
    loadChildren: () => import('./core/account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
