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

    deleteGroup(groupId: number): Observable<boolean> {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");

        const deletedGroupIndex = Groups.findIndex((i: any) => {
            return i.id == groupId;
        });

        Groups.splice(deletedGroupIndex, 1);

        localStorage.setItem("GroupsDB", JSON.stringify(Groups));
        return of(!Groups.find((element: any) => element.id == groupId))
    }

    editGroup(data: SettingsDto): Observable<boolean> {
        let Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");

        if (Groups.find((group: any) => group.name == data.name) == undefined) {
            let group = Groups.find((x: any) => x.id == data.id);
            group.name = data.name;
            localStorage.setItem("GroupsDB", JSON.stringify(Groups));
            return of(true)
        } else {
            return of(false)
        }
    }
}