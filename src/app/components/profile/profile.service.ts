import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class ProfileService {
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null");
    Users = JSON.parse(localStorage.getItem("UsersDB") || "[]");
    userInfo = this.Users.find((user: any) => user.userId == this.userProfile.userId);
}