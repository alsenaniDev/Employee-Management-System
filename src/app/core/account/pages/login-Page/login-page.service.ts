import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class LogInService {
    userToken = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
    Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
    Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    groupsId = this.Groups.map((group: any) => group.id)
}