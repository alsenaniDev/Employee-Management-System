import { Component, OnInit } from '@angular/core';
import { StatsCardServices } from './stats-card.service';
import { UsersServices } from "../../pages/user-Pages/users.service";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";


@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {
  userProfile: any
  usersInfo: any
  userFound: any
  users: getUserInfoModel[]
  userInfo: any


  constructor(private statsCardServices: StatsCardServices, private userServices: UsersServices) {

  }

  ngOnInit(): void {
    // this.users = this.statsCardServices.users

    this.getUserInfo()
    this.getUserInfoById()
    console.log('====================================');
    console.log(this.users);
    console.log('====================================');
    // this.userProfile = this.statsCardServices.userProfile
    // this.usersInfo = this.statsCardServices.usersInfo
    // this.userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
  }

  checkRole(userRole: string, superRole?: string) {
    return this.userInfo?.role == userRole || this.userInfo?.role == superRole;
  }
  getUserInfo() {
    this.userServices.getUsersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        this.users = res
        console.log(this.users)
      }, error: (err: any) => {
        return err;
      }
    })
  }
  getUserInfoById() {
    this.userServices.getUserInfoById().subscribe({
      next: (res: any) => {
        this.userInfo = res
        console.log(this.userInfo);

      },
      error: (err: any) => {
        return err;

      }
    })
  }
}
