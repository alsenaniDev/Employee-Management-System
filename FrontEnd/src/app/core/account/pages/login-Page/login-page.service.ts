import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { loginProxy } from "./login.proxy";

@Injectable({
    providedIn: "root",
})

export class LogInService {
    userToken: any = []
    usersInfo: any = []
    Roles: any = []
    Groups: any = []
    groupsId: any = []
    user: any
    userFound: any
    roleFound: any
    groupFound: any

    constructor(private http: HttpClient) {

    }

    bindData() {
        this.userToken = JSON.parse(localStorage.getItem("userInfo") || "null")
        this.usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
        this.Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
        this.Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        this.groupsId = this.Groups.map((group: any) => group.id)
    }

    logIn(email: string, password: string) {
        const body = { email, password }
        return this.http.post<any>(loginProxy.LOGIN_PROXY, body)
    }
}