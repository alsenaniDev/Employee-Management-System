import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SettingsDto } from "./Settings.Dto"
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root",
})

export class SettingService {
    constructor(private http: HttpClient) { }

    rootURL = '/api';

    getGroups() {
        return this.http.get(this.rootURL + "/groups/show");
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