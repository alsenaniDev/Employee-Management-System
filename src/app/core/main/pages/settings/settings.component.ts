import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { SettingModalComponent } from '../../components/setting-modal/setting-modal.component';
import { SettingService } from './settings.service'

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

  constructor(private SettingService: SettingService) { }
  @ViewChild(SettingModalComponent) modalShow: SettingModalComponent

  ngOnInit(): void {
    this.getGroupsCount()
    this.getRolesCount()
  }

  getGroups() {
    this.SettingService.getGroups().subscribe({
      next: (res: any) => {
        this.modalShow.dataName = "Groups"
        this.modalShow.data = res
        this.modalShow.data2 = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getGroupsCount() {
    this.SettingService.getGroupsCount().subscribe({
      next: (res: any) => {
        this.groupsNumber = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRoles() {
    this.SettingService.getRoles().subscribe({
      next: (res: any) => {
        this.modalShow.dataName = "Roles"
        this.modalShow.data = res
        this.modalShow.data2 = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getRolesCount() {
    this.SettingService.getRolesCount().subscribe({
      next: (res: any) => {
        this.rolesNumber = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
