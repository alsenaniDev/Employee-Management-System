import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowModalComponent } from '../common/show-modal/show-modal.component';
import { SettingService } from './settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  Groups: any = []
  Roles: any = []
  dataName: string = "";
  showModal: any

  constructor(private SettingService: SettingService) {

  }
  @ViewChild(ShowModalComponent) modalShow: ShowModalComponent

  ngOnInit(): void {
    this.Groups = this.SettingService.Groups
    this.Roles = this.SettingService.Roles
  }

  ngAfterViewInit(): void {

    this.showModal
  }

  showModel(name: string) {
    (<HTMLInputElement>document.getElementById("inputValue")).value = "";
    document.getElementById("model-title")!.innerHTML = name + " Model"
    document.getElementById("label-name")!.innerHTML = "Name of " + name
    document.getElementById("label-table")!.innerHTML = name + " Table"
    this.dataName = name;
    this.modalShow.getData(name)
  }
}
