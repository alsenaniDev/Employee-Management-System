import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NavbarServices {
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
}