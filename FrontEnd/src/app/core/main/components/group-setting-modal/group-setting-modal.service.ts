import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { Observable, of } from "rxjs";
import { Guid } from "guid-typescript";
import { SettingsDto } from "../../pages/settings/Settings.Dto";
import { GroupSettingModalProxy } from "./group-setting-modal.proxy"
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})

export class SettingModalService {
    constructor(private datePipe: DatePipe, private http: HttpClient) { }

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