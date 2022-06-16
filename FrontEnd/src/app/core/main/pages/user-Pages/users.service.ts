import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getUserModel } from "../../utility/Models/get-user-model.dto";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getGroupModel, getRoleModel } from "./show-users/Show-users-Dto";
import { UpdateUserInfoDto, User } from "./show-users/UserDto";
import { HttpClient } from "@angular/common/http";
import { ShowUsersProxy } from "./users.proxy";
import { AddUserDto } from "./add-user/AddUserDto";
import { Guid } from "guid-typescript";


@Injectable({ providedIn: "root" })
export class UsersServices {
    datePipe: any;

    constructor(private http: HttpClient) { }

    getUsersInfoData() {
        return this.http.get<getUserInfoModel[]>(ShowUsersProxy.SHOW_USERS_PROXY)
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

    getRoles(): Observable<getRoleModel[]> {
        let response = JSON.parse(localStorage.getItem("RolesDB") || "[]")
        return of(response)
    }

    getGroups(): Observable<getGroupModel[]> {
        let response = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        return of(response)
    }

    DeleteUser(userId: string): Observable<boolean> {

        let userInfoIds: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
        let userInfoIdsIndex = userInfoIds.findIndex((user: any) => user.userId == userId)
        userInfoIds.splice(userInfoIdsIndex, 1)
        localStorage.setItem("usersInfoDB", JSON.stringify(userInfoIds))

        let UsersData: getUserModel[] = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let userDataIndex = UsersData.findIndex((user: any) => user.userId == userId)
        UsersData.splice(userDataIndex, 1)
        localStorage.setItem("UsersDB", JSON.stringify(UsersData))

        let findUserInTableInfoIds = userInfoIds.find((user: User) => user.userId == userId)
        let findUserInTableUsers = UsersData.find((user: getUserModel) => user.userId == userId)

        return of(!findUserInTableInfoIds && !findUserInTableUsers)
    }

    DeleteSelectUser(usersSelect: getUserInfoModel[]): Observable<boolean> {
        let usersSelectedIds = usersSelect.map((id: getUserInfoModel) => id.userId)

        let getUserInfoIds: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")

        let getUsersData: getUserModel[] = JSON.parse(localStorage.getItem("UsersDB") || "[]")

        for (let selectIds of usersSelect) {

            let UsersSelectInTableUsersIds = getUserInfoIds.find((user: User) => user.userId == selectIds.userId)
            getUserInfoIds.splice(getUserInfoIds.indexOf(UsersSelectInTableUsersIds), 1)

            let UsersSelectInTableUsersInfo = getUsersData.find((user: getUserModel) => user.userId == selectIds.userId)
            getUsersData.splice(getUsersData.indexOf(UsersSelectInTableUsersInfo), 1)
        }

        localStorage.setItem("usersInfoDB", JSON.stringify(getUserInfoIds))

        localStorage.setItem("UsersDB", JSON.stringify(getUsersData))

        let checkUserFoundInTableInfoIds = getUserInfoIds.find((user: User) => usersSelectedIds.includes(user.userId))

        let checkUserFoundInTableUsersData = getUsersData.find((user: getUserModel) => usersSelectedIds.includes(user.userId))

        return of(!checkUserFoundInTableInfoIds && !checkUserFoundInTableUsersData)
    }

    UpdateUserInfo(dto: UpdateUserInfoDto): Observable<boolean> {


        let getUsersData: getUserModel[] = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let FindUserDataIndex = getUsersData.findIndex((user: getUserModel) => user.userId == dto?.userId)

        let userDataBeforeUpdate = getUsersData[FindUserDataIndex]

        let getUserInfoIds: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
        let FindUserInfoIdsIndex = getUserInfoIds.findIndex((user: User) => user.userId == dto?.userId)

        let userInfoIdBeforeUpdate = getUserInfoIds[FindUserInfoIdsIndex]

        let findUserRole: any = JSON.parse(localStorage.getItem("RolesDB") || "[]")
            .find((role: any) => role.name == dto?.role)

        let findUserGroups: number[] = dto.groups.map((groupId: getGroupModel) => groupId.id)

        getUsersData[FindUserDataIndex] = Object.assign({}, getUsersData[FindUserDataIndex], {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            password: dto.password
        })

        getUserInfoIds[FindUserInfoIdsIndex] = Object.assign({}, getUserInfoIds[FindUserInfoIdsIndex], { role: findUserRole.id, groups: findUserGroups })

        localStorage.setItem("UsersDB", JSON.stringify(getUsersData))

        localStorage.setItem("usersInfoDB", JSON.stringify(getUserInfoIds))

        return of((JSON.stringify(userDataBeforeUpdate) != JSON.stringify(getUsersData[FindUserDataIndex]))
            || (JSON.stringify(userInfoIdBeforeUpdate) != JSON.stringify(getUserInfoIds[FindUserInfoIdsIndex])))

    }


    addUser(dto: AddUserDto): Observable<boolean> {
        let getUsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let getUsersInfoIds = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
        let userFound = JSON.parse(localStorage.getItem("userInfo") || "null")


        let guid = Guid.create().toJSON();
        let userGuid = guid.value


        let userData = {
            userId: userGuid,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: dto.password,
            phoneNumber: dto.phoneNumber,
            CreatedBy: userFound.userId,
            CreatedAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
        }

        getUsersData.push(userData)
        localStorage.setItem("UsersDB", JSON.stringify(getUsersData))

        const userInfo = {
            userId: userGuid,
            role: dto.role,
            groups: dto.groups
        }
        getUsersInfoIds.push(userInfo)
        localStorage.setItem("usersInfoDB", JSON.stringify(getUsersInfoIds))

        let FindUserInfoIds = getUsersInfoIds?.find((user: getUserModel) => user.userId == userData.userId)
        let findUserData = getUsersInfoIds?.find((user: User) => user.userId == userInfo.userId)
        return of(FindUserInfoIds && findUserData)
    }

}