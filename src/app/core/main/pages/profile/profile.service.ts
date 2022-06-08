import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AlertMessageServices } from "../../utility/services/AlertMessage.Services";
import { getGroupModel, getRoleModel } from "../user-Pages/show-users/Show-users-Dto";
import { User } from "../../pages/user-Pages/show-users/UserDto";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getUserModel } from "../../utility/Models/get-user-model.dto";
import { UpdateUserInfoDto, UpdateUserPasswordDto } from "./profile.dto";

@Injectable({
    providedIn: "root",
})

export class ProfileService {

    constructor(private router: Router) {

    }

    getUsersData(): Observable<getUserModel[]> {
        return of(JSON.parse(localStorage.getItem("UsersDB") || "[]"));
    }

    getUserInfoById(userId: string): Observable<getUserInfoModel> {
        // method chaining 
        var userInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
            .find((user: User) => user.userId == userId);

        var user = JSON.parse(localStorage.getItem("UsersDB") || "[]")
            .find((user: getUserModel) => user.userId == userInfo?.userId ?? userId);

        var userRoles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
            .find((role: getRoleModel) => role.id == userInfo.role).name;

        var userGroups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
            .filter((group: getGroupModel) => userInfo.groups.includes(group.id))
            .map((item: getGroupModel) => { return item.name; });

        var response: getUserInfoModel = {
            userId: user.userId,
            CreatedAt: user.CreatedAt,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            CreatedBy: user.CreatedBy,
            password: user.password,
            groups: userGroups,
            role: userRoles
        }
        return of(response);
    }

    UpdateUserInformation(dto: UpdateUserInfoDto): Observable<boolean> {
        let users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let userIndex = users.findIndex((user: any) => user.userId == dto.userId)
        let userInfoBeforeUpdate = JSON.stringify(users[userIndex])
        users[userIndex] = Object.assign({}, users[userIndex],
            {
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber
            })
        let isEdit = userInfoBeforeUpdate != JSON.stringify(users[userIndex])
        if (isEdit) {
            localStorage.setItem("UsersDB", JSON.stringify(users))
        }
        return of(isEdit)
    }

    UpdateUserPassword(dto: UpdateUserPasswordDto): Observable<boolean> {
        let users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let userIndex = users.findIndex((user: any) => user.userId == dto.userId)
        let userInfoBeforeUpdate = JSON.stringify(users[userIndex])
        users[userIndex] = Object.assign({}, users[userIndex], { password: dto.password })
        let isEdit = userInfoBeforeUpdate != JSON.stringify(users[userIndex])
        if (isEdit) {
            localStorage.setItem("UsersDB", JSON.stringify(users))
        }
        return of(isEdit)
    }
}