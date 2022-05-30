import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class SettingService {
    Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
}