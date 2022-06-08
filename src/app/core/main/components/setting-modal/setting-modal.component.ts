import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingModalService } from './setting-modal.service';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { AlertMessageServices } from '../../utility/services/AlertMessage.Services'
import { popupAlertMessage } from '../../utility/services/popupAlert.services'

@Component({
  selector: 'app-Setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.css']
})
export class SettingModalComponent implements OnInit {
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
    private SettingModalService: SettingModalService,
    private SettingsComponent: SettingsComponent,
    private AlertMessageServices: AlertMessageServices,
    private popupAlertMessage: popupAlertMessage,
  ) {
  }

  ngOnInit() {
  }

  addGroup() {
    let inputValue = this.inputValue.nativeElement.value
    if (inputValue != "") {
      this.SettingModalService.addGroup(inputValue).subscribe({
        next: (res: any) => {
          if (res) {
            this.AlertMessageServices.success("Group added successfully");
            this.SettingsComponent.getGroups();
            this.SettingsComponent.getGroupsCount();
            this.inputValue.nativeElement.value = ""
            this.message.nativeElement.style.display = 'none'
          } else {
            this.AlertMessageServices.Warning("This Group is already exists !!!");
          }
        }
      });
    } else {
      this.message.nativeElement.style.display = ''
    }
  }

  addRole() {
    let inputValue = this.inputValue.nativeElement.value
    if (inputValue != "") {
      this.SettingModalService.addRole(inputValue).subscribe({
        next: (res: any) => {
          if (res) {
            this.AlertMessageServices.success("Role added successfully");
            this.SettingsComponent.getRoles();
            this.SettingsComponent.getRolesCount();
            this.inputValue.nativeElement.value = ""
            this.message.nativeElement.style.display = 'none'
          } else {
            this.AlertMessageServices.Warning("This Role is already exists !!!");
          }
        }
      });
    } else {
      this.message.nativeElement.style.display = ''
    }
  }

  deleteGroup(id: number) {
    this.popupAlertMessage.servicesAlert({
      header: "Delete Group",
      message: "Are you sure you want to delete this group?",
      operations: () => {
        this.SettingModalService.deleteGroup(id).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.AlertMessageServices.success("Group deleted successfully!");
            }
            else {
              this.AlertMessageServices.Warning("Group did't deleted successfully!");
            }
          },
          error: (err: any) => {
            this.AlertMessageServices.error(err.message);
          }
        });
        this.SettingsComponent.getGroups();
        this.SettingsComponent.getGroupsCount();
      }
    })
  }

  deleteRole(id: number) {
    this.popupAlertMessage.servicesAlert({
      header: "Delete Group",
      message: "Are you sure you want to delete this role?",
      operations: () => {
        this.SettingModalService.deleteRole(id).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.AlertMessageServices.success("Role deleted successfully!");
            } else {
              this.AlertMessageServices.Warning("Role did't deleted successfully!");
            }
          }
        });
        this.SettingsComponent.getRoles();
        this.SettingsComponent.getRolesCount();
      }
    })
  }

  onRowEditInit(data: SettingsDto) {
    this.clonedGroups[data.id] = { ...data };
  }

  onRowEditSave(data: SettingsDto, dataName: string) {
    delete this.clonedGroups[data.id];
    if (dataName == "Groups") {
      this.SettingModalService.editGroup(data.id, this.editValue.nativeElement.value).subscribe({
        next: (res: boolean) => {
          if (res) {
            this.AlertMessageServices.success("Group is edited successfully");
          } else {
            this.AlertMessageServices.error("This Group is already exists !!!");
          }
        },
        error: (err: any) => {
          this.AlertMessageServices.error("This Group is already exists !!!");
        }
      });
    } else {
      this.SettingModalService.editRole(data.id, this.editValue.nativeElement.value).subscribe({
        next: (res: boolean) => {
          if (res) {
            this.AlertMessageServices.success("Role is edited successfully");
          } else {
            this.AlertMessageServices.error("This Role is already exists !!!");
          }
        },
        error: (err: any) => {
          this.AlertMessageServices.error("This Role is already exists !!!");
        }
      });
    }
  }

  onRowEditCancel(data: SettingsDto, index: number) {
    this.data2[index] = this.clonedGroups[data.id];
  }
}
