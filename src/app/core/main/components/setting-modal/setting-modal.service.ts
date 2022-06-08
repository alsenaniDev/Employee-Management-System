import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { AlertMessageServices } from '../../utility/services/AlertMessage.Services'
import { popupAlertMessage } from '../../utility/services/popupAlert.services'
import { Observable, of } from "rxjs";
import { SettingsDto } from "../../pages/settings/Settings.Dto";
import { SettingsComponent } from '../../pages/settings/settings.component';

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(
        private datePipe: DatePipe,
        private AlertMessageServices: AlertMessageServices,
        private popupAlertMessage: popupAlertMessage,
        private SettingsComponent: SettingsComponent,) { }

    addGroup(name: string) {
        let userFound = JSON.parse(localStorage.getItem("userInfo") || "[]");
        let groups = JSON.parse(localStorage.getItem("GroupsDB") || 'null');

        if (groups == null || groups.length <= 0) {
            let newGroups = [{
                id: 1,
                name: name,
                createBy: userFound.userId,
                createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            }];
            localStorage.setItem("GroupsDB", JSON.stringify(newGroups));
        } else {
            if (groups.find((group: any) => group.name == name) == undefined) {
                let groups = JSON.parse(localStorage.getItem("GroupsDB") || '');
                let lastItem = groups[groups.length - 1];
                let newItem = {
                    id: lastItem.id + 1,
                    name: name,
                    createBy: userFound.userId,
                    createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
                };
                groups.push(newItem);
                localStorage.setItem("GroupsDB", JSON.stringify(groups));
            } else {
                this.AlertMessageServices.error("This Group is already exists !!!");
            }
        }
    }

    addRole(name: string) {
        let userFound = JSON.parse(localStorage.getItem("userInfo") || "[]");
        let roles = JSON.parse(localStorage.getItem("RolesDB") || 'null');

        if (roles == null || roles.length <= 0) {
            let newRoles = [{
                id: 1,
                name: name,
                createBy: userFound.userId,
                createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            }];
            localStorage.setItem("RolesDB", JSON.stringify(newRoles));
        } else {
            if (roles.find((role: any) => role.name == name) == undefined) {
                let roles = JSON.parse(localStorage.getItem("RolesDB") || '');
                let lastItem = roles[roles.length - 1];
                let newItem = {
                    id: lastItem.id + 1,
                    name: name,
                    createBy: userFound.userId,
                    createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
                };
                roles.push(newItem);
                localStorage.setItem("RolesDB", JSON.stringify(roles));
            } else {
                this.AlertMessageServices.error("This Role is already exists !!!");
            }
        }
    }

    deleteGroup(groupId: any) {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        Groups = Groups.filter((x: any) => x.id != groupId)
        localStorage.setItem("GroupsDB", JSON.stringify(Groups));
        this.AlertMessageServices.success("Group deleted successfully!");
    }

    deleteRole(roleId: any) {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
        Roles = Roles.filter((x: any) => x.id != roleId)
        localStorage.setItem("RolesDB", JSON.stringify(Roles));
        this.AlertMessageServices.success("Role deleted successfully!");
    }

    editGroup(groupId: any, groupNewName: string) {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");
        if (Groups.find((group: any) => group.name == groupNewName) == undefined) {
            let group = Groups.find((x: any) => x.id == groupId);
            group.name = groupNewName;
            localStorage.setItem("GroupsDB", JSON.stringify(Groups));
        } else {
            this.AlertMessageServices.error("This Group is already exists !!!");
        }
    }

    editRole(roleId: any, roleNewName: string) {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");
        if (Roles.find((role: any) => role.name == roleNewName) == undefined) {
            let role = Roles.find((x: any) => x.id == roleId);
            role.name = roleNewName;
            localStorage.setItem("RolesDB", JSON.stringify(Roles));
        } else {
            this.AlertMessageServices.error("This Role is already exists !!!");
        }
    }
}