import { Component, Injectable, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StatsCardServices } from './stats-card.service';
import { UsersServices } from "../../pages/user-Pages/users.service";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getAllUsersModelDto, pagedResultResponse } from '../../utility/Models/pagedResult.dto';
import { CommonService } from '../../utility/services/common/settings.service';
import { group } from '@angular/animations';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { data } from 'jquery';
import { mergeMap, of } from 'rxjs';
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

  // Chart Options
  style = getComputedStyle(document.body)
  options: any;
  labelsColor: string = this.style.getPropertyValue('--labelsColor');
  @ViewChild("chartt") chart: UIChart;

  constructor(private statsCardServices: StatsCardServices,
    private userServices: UsersServices,
    private CommonService: CommonService
  ) {



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
    // this.changeThemes()


  }
  ngAfterViewInit() {
    console.log(this.chart);

  }
  // ngAfterViewInit() {
  //   this.changeThemes()
  // }

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
    let BarColor = this.style.getPropertyValue('--BarColor');
    let theme = localStorage.getItem("theme")
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
                backgroundColor: this.labelsColor,
                data: this.groupsCount
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
                backgroundColor: this.labelsColor,
                data: this.rolesCount,
              }]
          }


        }
        console.log(theme);

      })
  }



}
