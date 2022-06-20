import { Component, OnInit } from '@angular/core';
import { SettingModalService } from './group-setting-modal.service';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { AlertMessageServices } from '../../utility/services/alert/AlertMessage.Services'
import { popupAlertMessage } from '../../utility/services/alert/popupAlert.services'

@Component({
  selector: 'app-Group-Setting-modal',
  templateUrl: './group-setting-modal.component.html',
  styleUrls: ['./group-setting-modal.component.css']
})
export class GroupSettingModalComponent implements OnInit {
  inputValue = "";
  alertShow = false;
  show = true;

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

  addGroup() {
    if (this.inputValue != "") {
      this.SettingModalService.addGroup(this.inputValue).subscribe({
        next: (res: any) => {
          if (res) {
            this.AlertMessageServices.success("Group added successfully");
            this.SettingsComponent.getGroups();
            this.SettingsComponent.getGroupsCount();
            this.inputValue = "";
            this.alertShow = false;
          } else {
            this.AlertMessageServices.Warning("This Group is already exists !!!");
          }
        }
      });
    } else {
      this.alertShow = true;
    }
  }

  deleteGroup(id: number) {
    this.popupAlertMessage.servicesAlert({
      header: "Delete Group",
      message: "Are you sure you want to delete this group?",
      operations: () => {
        this.SettingModalService.deleteGroup(id).subscribe({
          next: (res) => {
            if (res) {
              this.AlertMessageServices.success("Group deleted successfully!");
            }
            else {
              this.AlertMessageServices.Warning("Group did't deleted successfully!");
            }
          },
          error: (err: any) => {
            if (err.status == 401) {
              this.AlertMessageServices.error("You do not have permission to delete Groups !!!");
            } else {
              this.AlertMessageServices.error(err.message);
            }
          }
        });
        this.SettingsComponent.getGroups();
        this.SettingsComponent.getGroupsCount();
      }
    })
  }

  editGroup(data: SettingsDto) {
    this.SettingModalService.editGroup(data).subscribe({
      next: (res) => {
        if (res) {
          this.AlertMessageServices.success("Group is edited successfully");
        } else {
          this.AlertMessageServices.error("This Group is already exists !!!");
        }
      },
      error: (err: any) => {
        if (err.status == 401) {
          this.AlertMessageServices.error("You do not have permission to update Groups !!!");
        } else {
          this.AlertMessageServices.error(err.message);
        }
        // this.AlertMessageServices.error("This Group is already exists !!!");
      }
    });
  }

  onRowEditInit(data: SettingsDto) {
    this.clonedGroups[data._id] = { ...data };
  }

  onRowEditSave(data: SettingsDto) {
    delete this.clonedGroups[data._id];
    this.editGroup(data)
  }

  onRowEditCancel(data: SettingsDto, index: number) {
    this.data2[index] = this.clonedGroups[data._id];
  }
}
