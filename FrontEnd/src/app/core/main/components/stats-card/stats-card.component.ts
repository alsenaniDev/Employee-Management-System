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
  show = true


  constructor(private statsCardServices: StatsCardServices, private userServices: UsersServices) {

  }

  ngOnInit(): void {
    this.getUserInfo()
    this.getUserInfoById()
  }

  checkRole(userRole: string, superRole?: string) {
    return this.userInfo?.role == userRole || this.userInfo?.role == superRole;
  }
  getUserInfo() {
    this.userServices.getUsersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        this.users = res
        this.show = false
      }, error: (err: any) => {
        return err;
      }
    })
  }

  getUserInfoById() {
    this.userServices.getUserInfoById().subscribe({
      next: (res: any) => {
        this.userInfo = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }
}
