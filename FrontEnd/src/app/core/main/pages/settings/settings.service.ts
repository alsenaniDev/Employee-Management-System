import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SettingsDto } from "./Settings.Dto"

@Injectable({
    providedIn: "root",
})

export class SettingService {
    constructor() { }

    getGroups(): Observable<SettingsDto[]> {
        return of(JSON.parse(localStorage.getItem("GroupsDB") || "[]"));
    }

    getGroupsCount(): Observable<SettingsDto[]> {
        return of(JSON.parse(localStorage.getItem("GroupsDB") || "[]").length);
    }

    getRoles(): Observable<SettingsDto[]> {
        return of(JSON.parse(localStorage.getItem("RolesDB") || "[]"));
    }

    getRolesCount(): Observable<SettingsDto[]> {
        return of(JSON.parse(localStorage.getItem("RolesDB") || "[]").length);
    }
}