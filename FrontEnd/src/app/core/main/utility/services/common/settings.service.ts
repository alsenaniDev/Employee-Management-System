import { Injectable } from "@angular/core";
import { SettingsDto } from "../../../pages/settings/Settings.Dto"
import { HttpClient } from '@angular/common/http';
import { SettingsProxy } from './settings.proxy'
import { mergeMap, interval } from 'rxjs';

@Injectable({
    providedIn: "root",
})

export class CommonService {
    constructor(private http: HttpClient) { }

    getGroups() {
        let userId = JSON.parse(localStorage.getItem('userInfo'))
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_GROUPS + userId?.data.userId);
    }

    getGroupsCount() {
        return this.http.get<number>(SettingsProxy.GET_GROUPS_COUNT);
    }

    getRoles() {
        let userId = JSON.parse(localStorage.getItem('userInfo'))
        return this.http.get<SettingsDto[]>(SettingsProxy.GET_ROLES + userId?.data.userId);
    }

    getRolesCount() {
        return this.http.get<number>(SettingsProxy.GET_ROLES_COUNT);
    }

    getServiceRoles() {
        return this.http.get<number>(SettingsProxy.GET_SERVICE_ROLES);
    }
}