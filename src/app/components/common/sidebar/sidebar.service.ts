import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class SidebarService {
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null");
}