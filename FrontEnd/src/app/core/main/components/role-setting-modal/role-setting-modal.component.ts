import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingModalService } from './role-setting-modal.service';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { AlertMessageServices } from '../../utility/services/AlertMessage.Services'
import { popupAlertMessage } from '../../utility/services/popupAlert.services'

@Component({
  selector: 'app-Role-Setting-modal',
  templateUrl: './role-setting-modal.component.html',
  styleUrls: ['./role-setting-modal.component.css']
})
export class RoleSettingModalComponent implements OnInit {
  inputValue = "";
  alertShow = false;

  data: any = [];
  data2: any = [];

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

  addRole() {
    if (this.inputValue != "") {
      this.SettingModalService.addRole(this.inputValue).subscribe({
        next: (res: any) => {
          if (res) {
            this.AlertMessageServices.success("Role added successfully");
            this.SettingsComponent.getRoles();
            this.SettingsComponent.getRolesCount();
            this.inputValue = ""
            this.alertShow = false;
          } else {
            this.AlertMessageServices.Warning("This Role is already exists !!!");
          }
        }
      });
    } else {
      this.alertShow = true;
    }
  }

  deleteRole(id: number) {
    this.popupAlertMessage.servicesAlert({
      header: "Delete Role",
      message: "Are you sure you want to delete this role?",
      operations: () => {
        this.SettingModalService.deleteRole(id).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.AlertMessageServices.success("Role deleted successfully!");
            }
            else {
              this.AlertMessageServices.Warning("Role did't deleted successfully!");
            }
          },
          error: (err: any) => {
            this.AlertMessageServices.error(err.message);
          }
        });
        this.SettingsComponent.getRoles();
        this.SettingsComponent.getRolesCount();
      }
    })
  }

  editRole(data: SettingsDto) {
    this.SettingModalService.editRole(data).subscribe({
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

  onRowEditInit(data: SettingsDto) {
    this.clonedGroups[data.id] = { ...data };
  }

  onRowEditSave(data: SettingsDto) {
    delete this.clonedGroups[data.id];
    this.editRole(data)
  }

  onRowEditCancel(data: SettingsDto, index: number) {
    this.data2[index] = this.clonedGroups[data.id];
  }
}
