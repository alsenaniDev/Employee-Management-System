import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShowModalServices {
    userFound = JSON.parse(localStorage.getItem("userInfo") || "[]")
    Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
}