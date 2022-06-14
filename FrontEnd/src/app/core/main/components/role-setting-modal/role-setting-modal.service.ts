import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Observable, of } from "rxjs";
import { Guid } from "guid-typescript";
import { SettingsDto } from "../../pages/settings/Settings.Dto";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe) { }

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

    deleteRole(roleId: number): Observable<boolean> {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");

        const deletedRoleIndex = Roles.findIndex((i: any) => {
            return i.id == roleId;
        });

        Roles.splice(deletedRoleIndex, 1);

        localStorage.setItem("RolesDB", JSON.stringify(Roles));
        return of(!Roles.find((element: any) => element.id == roleId))
    }

    editRole(data: SettingsDto): Observable<boolean> {
        let Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]");

        if (Roles.find((role: any) => role.name == data.name) == undefined) {
            let group = Roles.find((x: any) => x.id == data.id);
            group.name = data.name;
            localStorage.setItem("RolesDB", JSON.stringify(Roles));
            return of(true)
        } else {
            return of(false)
        }
    }
}