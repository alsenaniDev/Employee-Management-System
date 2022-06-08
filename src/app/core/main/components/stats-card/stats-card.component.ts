import { Component, OnInit } from '@angular/core';
import { StatsCardServices } from './stats-card.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {
  users: any
  userProfile: any
  usersInfo: any
  userFound: any


  constructor(private statsCardServices: StatsCardServices) {

  }

  ngOnInit(): void {
    this.users = this.statsCardServices.users
    this.userProfile = this.statsCardServices.userProfile
    this.usersInfo = this.statsCardServices.usersInfo
    this.userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
  }

  checkRole(userRole: string, superRole?: string) {
    return this.userProfile.role == userRole || this.userProfile.role == superRole;
  }
}
