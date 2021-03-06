import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GroupSettingModalComponent } from '../../components/group-setting-modal/group-setting-modal.component';
import { RoleSettingModalComponent } from '../../components/role-setting-modal/role-setting-modal.component';
import { ServiceRoleSettingModalComponent } from '../../components/serviceRole-setting-modal/serviceRole-setting-modal.component';
import { CommonService } from '../../utility/services/common/settings.service'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  groupsNumber: number = 0;
  rolesNumber: number = 0;
  dataName: string = "";
  showModal: any
  show = true

  constructor(private CommonService: CommonService) { }
  @ViewChild(GroupSettingModalComponent) groupModal: GroupSettingModalComponent
  @ViewChild(RoleSettingModalComponent) roleModal: RoleSettingModalComponent
  @ViewChild(ServiceRoleSettingModalComponent) serviceRoleModal: ServiceRoleSettingModalComponent

  ngOnInit(): void {
    this.getRolesAndGroupsCount()
  }

  getGroups() {
    this.CommonService.getGroups().subscribe({
      next: (res: any) => {
        this.groupModal.data = res
        this.groupModal.data2 = res
        this.groupModal.alertShow = false
        this.groupModal.show = false
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getGroupsCount() {
    this.CommonService.getGroupsCount().subscribe({
      next: (res: any) => {
        this.groupsNumber = res.data;
        this.show = false
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRoles() {
    this.CommonService.getRoles().subscribe({
      next: (res: any) => {
        this.roleModal.data = res
        this.roleModal.data2 = res
        this.roleModal.alertShow = false
        this.roleModal.show = false
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRolesCount() {
    this.CommonService.getRolesCount().subscribe({
      next: (res: any) => {
        this.rolesNumber = res.data;
        this.show = false
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRolesAndGroupsCount() {
    let groups = (this.CommonService.getGroupsCount())
    let roles = (this.CommonService.getRolesCount())
    forkJoin([groups, roles])
      .subscribe(results => {
        this.groupsNumber = results[0];
        this.rolesNumber = results[1];
        this.show = false
      });
  }

  getServiceRoles() {
    let serviceRoles = (this.CommonService.getServiceRoles())
    let roles = (this.CommonService.getRoles())
    forkJoin([serviceRoles, roles])
      .subscribe(results => {
        this.serviceRoleModal.services = results[0];
        this.serviceRoleModal.roles = results[1];
        this.show = false
      });
  }
}
