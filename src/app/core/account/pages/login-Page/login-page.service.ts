import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

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

    bindData() {
        this.userToken = JSON.parse(localStorage.getItem("userInfo") || "null")
        this.usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
        this.Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
        this.Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        this.groupsId = this.Groups.map((group: any) => group.id)
    }

    logIn(email: string, password: string): Observable<boolean> {
        let users = JSON.parse(localStorage.getItem("UsersDB") || "");
        this.user = users.find((u: any) => u.email == email && u.password == password)

        let response = false;

        if (this.user) {
            this.userFound = this.usersInfo.find((u: any) => u.userId == this.user.userId)
            this.roleFound = this.Roles.find((r: any) => r.id == this.userFound.role)
            this.groupFound = this.Groups.filter((group: any) => this.userFound.groups.includes(group.id))
            let myGroupsName = this.groupFound.map((group: any) => group.name)
            let userInformation = {
                userId: this.user.userId,
                name: this.user.firstName + " " + this.user.lastName,
                role: this.roleFound.name,
                groups: myGroupsName
            }
            localStorage.setItem("userInfo", JSON.stringify(userInformation))
            response = true;
        } else {
            response = false;
        }
        return of(response)
    }
}