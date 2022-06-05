import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowModalService } from './show-modal.service';
import { SettingsComponent } from '../../settings/settings.component';
import { SettingsDto } from '../../settings/Settings.Dto';
import { AlertMessageServices } from '../../AlertMessage.Services'
import { popupAlertMessage } from '../../popupAlert.services'

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.css']
})
export class ShowModalComponent implements OnInit {
  @ViewChild('inputValue') inputValue: ElementRef;
  @ViewChild('alert') message: ElementRef;
  @ViewChild('editValue') editValue: ElementRef;

  data: any = [];
  data2: any = [];
  elementId: string = "";
  dataName: string = "";
  oldName: string = "";

  clonedGroups: { [s: string]: SettingsDto; } = {};

  constructor(
    private ShowModalService: ShowModalService,
    private SettingsComponent: SettingsComponent,
    private AlertMessageServices: AlertMessageServices,
    private popupAlertMessage: popupAlertMessage,
  ) {
  }

  ngOnInit() {
  }

  addGroup() {
    if (this.inputValue.nativeElement.value != "") {
      this.ShowModalService.addGroup(this.inputValue.nativeElement.value);
      this.SettingsComponent.getGroups();
      this.SettingsComponent.getGroupsCount();
      this.inputValue.nativeElement.value = ""
      this.message.nativeElement.style.display = 'none'
    } else {
      this.message.nativeElement.style.display = ''
    }
  }

  addRole() {
    if (this.inputValue.nativeElement.value != "") {
      this.ShowModalService.addRole(this.inputValue.nativeElement.value);
      this.SettingsComponent.getRoles();
      this.SettingsComponent.getRolesCount();
      this.inputValue.nativeElement.value = ""
      this.message.nativeElement.style.display = 'none'
    } else {
      this.message.nativeElement.style.display = ''
    }
  }

  deleteGroup(id: string) {
    let deleteGroup = () => {
      this.ShowModalService.deleteGroup(id);
      this.SettingsComponent.getGroups();
      this.SettingsComponent.getGroupsCount();
    }

    this.popupAlertMessage.servicesAlert({
      header: "Delete Group",
      message: "Are you sure you want to delete this group?",
      operations: deleteGroup
    })
  }

  deleteRole(id: string) {
    let deleteRole = () => {
      this.ShowModalService.deleteRole(id);
      this.SettingsComponent.getRoles();
      this.SettingsComponent.getRolesCount();
    }

    this.popupAlertMessage.servicesAlert({
      header: "Delete Group",
      message: "Are you sure you want to delete this role?",
      operations: deleteRole
    })
  }

  onRowEditInit(data: SettingsDto) {
    this.clonedGroups[data.id] = { ...data };
  }

  onRowEditSave(data: SettingsDto, dataName: string) {
    delete this.clonedGroups[data.id];
    if (dataName == "Groups") {
      this.ShowModalService.editGroup(data.id, this.editValue.nativeElement.value);
    } else {
      this.ShowModalService.editRole(data.id, this.editValue.nativeElement.value);
    }
  }

  onRowEditCancel(data: SettingsDto, index: number) {
    this.data2[index] = this.clonedGroups[data.id];
  }
}
