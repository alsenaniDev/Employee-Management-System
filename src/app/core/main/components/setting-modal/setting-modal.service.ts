import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Observable, of } from "rxjs";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe) { }

    addGroup(name: string): Observable<boolean> {
        let userFound = JSON.parse(localStorage.getItem("userInfo") || "[]");
        let groups = JSON.parse(localStorage.getItem("GroupsDB") || '[]');

        if (groups?.find((group: any) => group.name == name) == undefined) {
            let guid = Guid.create().toJSON();
            let groupGuid = guid.value

            let newItem = {
                id: groupGuid,
                name: name,
                createBy: userFound.userId,
                createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            };
            groups.push(newItem);
            localStorage.setItem("GroupsDB", JSON.stringify(groups));
            return of(true)
        } else {
            return of(false)
        }
    }

    addRole(name: string) {
        let userFound = JSON.parse(localStorage.getItem("userInfo") || "[]");
        let roles = JSON.parse(localStorage.getItem("RolesDB") || 'null');

        if (roles?.find((role: any) => role.name == name) == undefined) {
            let guid = Guid.create().toJSON();
            let roleGuid = guid.value

            let newItem = {
                id: roleGuid,
                name: name,
                createBy: userFound.userId,
                createAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            };
            roles.push(newItem);
            localStorage.setItem("RolesDB", JSON.stringify(roles));
            return of(true)
        } else {
            return of(false)
        }
    }

    deleteGroup(groupId: number): Observable<boolean> {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");

        const deletedGroupIndex = Groups.findIndex((i: any) => {
            return i.id == groupId;
        });

        Groups.splice(deletedGroupIndex, 1);

        localStorage.setItem("GroupsDB", JSON.stringify(Groups));
        return of(!Groups.find((element: any) => element.id == groupId))
    }

    deleteRole(roleId: number): Observable<boolean> {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");

        const deletedRoleIndex = Roles.findIndex((i: any) => {
            return i.id == roleId;
        });

        Roles.splice(deletedRoleIndex, 1);

        localStorage.setItem("RolesDB", JSON.stringify(Roles));
        return of(!Roles.find((element: any) => element.id == roleId))
    }

    editGroup(groupId: number, groupNewName: string): Observable<boolean> {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");

        if (Groups.find((group: any) => group.name == groupNewName) == undefined) {
            let group = Groups.find((x: any) => x.id == groupId);
            group.name = groupNewName;
            localStorage.setItem("GroupsDB", JSON.stringify(Groups));
            return of(true)
        } else {
            return of(false)
        }
    }

    editRole(roleId: any, roleNewName: string): Observable<boolean> {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");

        if (Roles.find((role: any) => role.name == roleNewName) == undefined) {
            let group = Roles.find((x: any) => x.id == roleId);
            group.name = roleNewName;
            localStorage.setItem("RolesDB", JSON.stringify(Roles));
            return of(true)
        } else {
            return of(false)
        }
    }
}