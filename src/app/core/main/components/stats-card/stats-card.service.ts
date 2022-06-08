import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StatsCardServices {
    users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
}