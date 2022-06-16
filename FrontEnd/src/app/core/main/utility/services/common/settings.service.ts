import { Injectable } from "@angular/core";
import { SettingsDto } from "../../../pages/settings/Settings.Dto"
import { HttpClient } from '@angular/common/http';
import { SettingsProxy } from './settings.proxy'

@Injectable({
    providedIn: "root",
})

export class CommonService {
    constructor(private http: HttpClient) { }

    getGroups() {
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_GROUPS);
    }

    getGroupsCount() {
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_GROUPS_COUNT);
    }

    getRoles() {
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_ROLES);
    }

    getRolesCount() {
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_ROLES_COUNT);
    }
}