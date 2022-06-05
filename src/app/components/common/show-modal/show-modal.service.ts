import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})

export class ShowModalService {
    constructor(private datePipe: DatePipe, private messageService: MessageService) { }

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
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Group is already exists !!!' });
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
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Role is already exists !!!' });
            }
        }
    }

    deleteGroup(groupId: any) {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        Groups = Groups.filter((x: any) => x.id != groupId)
        localStorage.setItem("GroupsDB", JSON.stringify(Groups));
    }

    deleteRole(roleId: any) {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
        Roles = Roles.filter((x: any) => x.id != roleId)
        localStorage.setItem("RolesDB", JSON.stringify(Roles));
    }

    editGroup(groupId: any, groupNewName: string) {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");
        if (Groups.find((group: any) => group.name == groupNewName) == undefined) {
            let group = Groups.find((x: any) => x.id == groupId);
            group.name = groupNewName;
            localStorage.setItem("GroupsDB", JSON.stringify(Groups));
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This Group is already exists !!!' });
        }
    }

    editRole(roleId: any, roleNewName: string) {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");
        let group = Roles.find((x: any) => x.id == roleId);
        group.name = roleNewName;
        localStorage.setItem("RolesDB", JSON.stringify(Roles));
    }
}