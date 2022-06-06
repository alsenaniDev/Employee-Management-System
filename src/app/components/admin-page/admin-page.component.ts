import { Component, OnInit } from '@angular/core';
import { AdminPageServices } from './admin-page-services';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: any
  userProfile: any
  usersInfo: any
  userFound: any


  constructor(private adminPageServices: AdminPageServices) {

  }

  ngOnInit(): void {
    this.users = this.adminPageServices.users
    this.userProfile = this.adminPageServices.userProfile
    this.usersInfo = this.adminPageServices.usersInfo
    this.userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
  }

  checkRole(userRole: string , superRole? : string) {
    return this.userProfile.role == userRole || this.userProfile.role == superRole ;
  }
}
