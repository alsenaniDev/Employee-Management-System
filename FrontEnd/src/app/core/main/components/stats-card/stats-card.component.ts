import { Component, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatsCardServices } from './stats-card.service';
import { UsersServices } from "../../pages/user-Pages/users.service";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getAllUsersModelDto, pagedResultResponse } from '../../utility/Models/pagedResult.dto';
import { CommonService } from '../../utility/services/common/settings.service';
import { group } from '@angular/animations';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { data } from 'jquery';


@Injectable({ providedIn: "root" })

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})

export class StatsCardComponent implements OnInit {
  userProfile: any
  usersInfo: any
  userFound: any
  usersCount: number
  userInfo: any
  show = true
  basicDataGroups: any
  basicDataRoles: any
  groups: string[]
  roles: string[]
  optionsObject: any
  getUsers: getUserInfoModel[]

  // Chart Options
  style = getComputedStyle(document.body)
  options: any;
  labelsColor: string = this.style.getPropertyValue('--labelsColor');
  BarColor: string = this.style.getPropertyValue('--BarColor');

  constructor(private statsCardServices: StatsCardServices, private userServices: UsersServices,
    private settingService: CommonService
  ) {
    this.getUserInfo()

    this.options = {
      indexAxis: 'x',
      plugins: {
        legend: {
          labels: {
            color: this.labelsColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: this.labelsColor
          },
          grid: {
            color: this.labelsColor
          }
        },
        y: {
          ticks: {
            color: this.labelsColor
          },
          grid: {
            color: this.labelsColor
          }
        }
      }
    };
  }

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
        this.getGroupsStats()
        this.getRolesStats()
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

  getGroupsStats() {
    this.settingService.getGroups().subscribe({
      next: (res) => {
        this.groups = res.map((g: any) => g.name)
        let groupsCount = this.groups.map((g: any) => this.getUsers?.filter((u: any) => u.groups.includes(g)).length)
        this.basicDataGroups = {
          labels: this.groups,
          datasets: [
            {
              label: 'Users',
              backgroundColor: this.BarColor,
              data: groupsCount
            }]
        }
      }
    })
  }

  getRolesStats() {
    this.settingService.getRoles().subscribe({
      next: (res) => {
        this.roles = res.map((r: any) => r.name)
        let rolesCount = this.roles.map((r: any) => this.getUsers?.filter((u: any) => u.role == r).length)

        this.basicDataRoles = {
          labels: this.roles,
          datasets: [
            {
              label: 'Users',
              backgroundColor: this.BarColor,
              data: rolesCount,
            }]
        }
      }
    })
  }

  refresh() {
    window.location.reload()
  }

  changeThemes(theme: string) {
    if (theme == "dark") {
      this.BarColor = "#FFF"
    } else {
      this.BarColor = "#000"
    }
  }
}
