import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { AddSettingsDto, SettingsDto } from "../../pages/settings/Settings.Dto";
import { ServiceRoleSettingModalProxy } from "./serviceRole-setting-modal.proxy"
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class ServiceRoleService {
    constructor(private datePipe: DatePipe, private http: HttpClient) { }

    getAllServiceRoles(body: AddSettingsDto) {
        return this.http.get(ServiceRoleSettingModalProxy.GET_SERVICE_ROLES)
    }

    getServiceRoles(serviceId: any) {
        return this.http.get(ServiceRoleSettingModalProxy.GET_SERVICE_ROLE + serviceId)
    }

    // editGroup(data: SettingsDto) {
    //     let body = {
    //         name: data.name,
    //     }

    //     return this.http.put<SettingsDto>(ServiceRoleSettingModalProxy.UPDATE_GROUP + data._id, body)
    // }
}