import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Observable, of } from "rxjs";
import { Guid } from "guid-typescript";
import { AddSettingsDto, SettingsDto } from "../../pages/settings/Settings.Dto";
import { HttpClient } from "@angular/common/http";
import { RoleSettingModalProxy } from "./role-setting-modal.proxy";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe, private http: HttpClient) { }

    addRole(body: AddSettingsDto) {
        return this.http.post(RoleSettingModalProxy.ADD_ROLE, body)
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