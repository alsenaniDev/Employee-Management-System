import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class AddUserServices {
    groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    roles = JSON.parse(localStorage.getItem("RolesDB") || '[]')
    Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
}