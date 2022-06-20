import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { AddSettingsDto, SettingsDto } from "../../pages/settings/Settings.Dto";
import { GroupSettingModalProxy } from "./group-setting-modal.proxy"
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe, private http: HttpClient) { }

    addGroup(body: AddSettingsDto) {
        return this.http.post(GroupSettingModalProxy.ADD_GROUP, body)
    }

    deleteGroup(groupId: number) {
        return this.http.delete(GroupSettingModalProxy.DELETE_GROUP + groupId)
    }

    editGroup(data: SettingsDto) {
        let body = {
            name: data.name,
        }

        return this.http.put<SettingsDto>(GroupSettingModalProxy.UPDATE_GROUP + data._id, body)
    }
}