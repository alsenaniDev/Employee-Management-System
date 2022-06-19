import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Observable, of } from "rxjs";
import { Guid } from "guid-typescript";
import { SettingsDto } from "../../pages/settings/Settings.Dto";
import { HttpClient } from "@angular/common/http";
import { RoleSettingModalProxy } from "./role-setting-modal.proxy";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe, private http: HttpClient) { }

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

    deleteRole(roleId: number) {
        return this.http.delete(RoleSettingModalProxy.DELETE_ROLE + roleId)
    }

    editRole(data: SettingsDto) {
        return this.http.put<SettingsDto>(RoleSettingModalProxy.UPDATE_ROLE + data._id, {
            name: data.name,
        })
    }
}