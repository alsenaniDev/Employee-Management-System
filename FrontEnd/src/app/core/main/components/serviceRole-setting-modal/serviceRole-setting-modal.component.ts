import { Component, OnInit } from '@angular/core';
import { ServiceRoleService } from './serviceRole-setting-modal.service';

@Component({
  selector: 'app-ServiceRole-Setting-modal',
  templateUrl: './serviceRole-setting-modal.component.html',
  styleUrls: ['./serviceRole-setting-modal.component.css']
})

export class ServiceRoleSettingModalComponent implements OnInit {
  services: any = [];
  roles: any = [];
  selectedValues: string[] = [];
  serviceId: string = "";


  constructor(private service: ServiceRoleService) {
  }

  ngOnInit() {
  }

  getServiceId(serviceId: string) {
    this.serviceId = serviceId;
    this.service.getServiceRoles(serviceId).subscribe({
      next: (res: any) => {
        this.selectedValues = res.rolesIds
      }
    })
  }

  getRoleId(roleId: string) {
    if (!this.selectedValues.includes(roleId)) {
      this.selectedValues.push(roleId + "H")
    } else {
      let foundRole = this.selectedValues.find(r => r == roleId);
      let roleIndex = this.selectedValues.indexOf(foundRole);
      this.selectedValues.splice(roleIndex, 1);
    }

    console.log(this.selectedValues);
  }
}
