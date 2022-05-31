import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShowUserServices {
    UsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
    Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
}