import { Injectable } from "@angular/core";
import { observable, Observable, of } from "rxjs";
import { getGroupModel, getRoleModel, getUserModel } from "../users/show-users/Show-users-Dto";
import { User } from "../users/show-users/UserDto";
import { getUserInfoModel, ProfileDto, UserData } from "./profile.dto";

@Injectable({
    providedIn: "root",
})

export class ProfileService {

    usersData(): Observable<getUserModel[]> {
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
}