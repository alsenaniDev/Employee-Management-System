import { Component, Injectable, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StatsCardServices } from './stats-card.service';
import { UsersServices } from "../../pages/user-Pages/users.service";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getAllUsersModelDto, pagedResultResponse } from '../../utility/Models/pagedResult.dto';
import { mergeMap, of, Subscription } from 'rxjs';
import { UIChart } from 'primeng/chart';

@Injectable({ providedIn: "root" })

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})

export class StatsCardComponent implements OnInit {
  usersCount: number
  userInfo: any
  show = true
  basicDataGroups: any
  basicDataRoles: any
  groups: string[]
  groupsCount: number[]
  roles: string[]
  rolesCount: number[]
  optionsObject: any
  getUsers: getUserInfoModel[]
  chartOptions: any

  subscription: Subscription;


  // Chart Options
  style = getComputedStyle(document.body)
  @ViewChild("chart") chart: UIChart;

  constructor(private statsCardServices: StatsCardServices,
    private userServices: UsersServices
  ) { }

  ngOnInit(): void {
    this.getUserInfo()
    this.getUserInfoById()
  }

  checkRole(userRole: string, superRole?: string) {
    return this.userInfo?.role == userRole || this.userInfo?.role == superRole;
  }

  async getUserInfo() {
    this.userServices.GetUserPaginator(new getAllUsersModelDto).subscribe({
      next: (res: pagedResultResponse<getUserInfoModel>) => {
        this.getUsers = res.result
        this.usersCount = res.totalRecords;
        this.show = false
        this.GetGroupsAndRoles()
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

  GetGroupsAndRoles() {
    of(this.statsCardServices.getUsersGroupsStats(), this.statsCardServices.getUsersRolesStats())
      .pipe(
        mergeMap((data
        ) => (
          data
        ))
      )
      .subscribe((data) => {
        if (Object.keys(data)[0] == "groupsNames") {
          this.groups = data.groupsNames
          this.groupsCount = data.groupsStats
          this.basicDataGroups = {
            labels: this.groups,
            datasets: [
              {
                label: 'Users',
                data: this.groupsCount,
                backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726",
                  "#26C6DA",
                  "#7E57C2"
                ],
              }]
          }
        }
        else {
          this.roles = data.rolesNames
          this.rolesCount = data.rolesStats
          this.basicDataRoles = {
            labels: this.roles,
            datasets: [
              {
                label: 'Users',
                data: this.rolesCount,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
                ]
              }]
          }
        }
      })
  }
}
