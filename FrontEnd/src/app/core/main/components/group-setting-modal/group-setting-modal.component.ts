import { Component, OnInit } from '@angular/core';
import { SettingModalService } from './group-setting-modal.service';
import { SettingsComponent } from '../../pages/settings/settings.component';
import { SettingsDto } from '../../pages/settings/Settings.Dto';
import { AlertMessageServices } from '../../utility/services/AlertMessage.Services'
import { popupAlertMessage } from '../../utility/services/popupAlert.services'

@Component({
  selector: 'app-Group-Setting-modal',
  templateUrl: './group-setting-modal.component.html',
  styleUrls: ['./group-setting-modal.component.css']
})
export class GroupSettingModalComponent implements OnInit {
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
    console.log(id);
    
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

  editGroup(data: SettingsDto) {
    this.SettingModalService.editGroup(data).subscribe({
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
  }

  onRowEditInit(data: SettingsDto) {
    this.clonedGroups[data.id] = { ...data };
  }

  onRowEditSave(data: SettingsDto) {
    delete this.clonedGroups[data.id];
    this.editGroup(data)
  }

  onRowEditCancel(data: SettingsDto, index: number) {
    this.data2[index] = this.clonedGroups[data.id];
  }
}
