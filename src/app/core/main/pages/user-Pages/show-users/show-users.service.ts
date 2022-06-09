import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { getUserModel } from "../../../utility/Models/get-user-model.dto";
import { AlertMessageServices } from "../../../utility/services/AlertMessage.Services";
import { popupAlertMessage } from "../../../utility/services/popupAlert.services";
import { getUserInfoModel } from "../../../utility/Models/get-user-model.dto";
import { getGroupModel, getRoleModel } from "./Show-users-Dto";
import { UpdateUserInfoDto, User } from "./UserDto";


@Injectable({ providedIn: "root" })
export class ShowUserServices {

    constructor(private alertMessage: AlertMessageServices) { }

    getUsersInfoData(): Observable<getUserInfoModel[]> {
        let UserIdsData: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
        var response: getUserInfoModel[] = UserIdsData.map((userIds: User) => {
            let userInfo = JSON.parse(localStorage.getItem("UsersDB" || "[]"))
                .find((user: getUserModel) => user.userId == userIds.userId)
            let userGroups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
                .filter((group: getGroupModel) => userIds.groups.includes(group.id))
                .map((item: getGroupModel) => { return item.name; });
            let userRoles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
                .find((role: getRoleModel) => role.id == userIds.role)?.name;

            return {
                userId: userInfo.userId,
                CreatedAt: userInfo.CreatedAt,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                phoneNumber: userInfo.phoneNumber,
                CreatedBy: userInfo.CreatedBy,
                password: userInfo.password,
                groups: userGroups,
                role: userRoles
            }
        });
        return of(response)
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
        let FinduserDataIndex = getUsersData.findIndex((user: getUserModel) => user.userId == dto?.userId)

        let userDataBeforeUpdate = getUsersData[FinduserDataIndex]

        let getUserInfoIds: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
        let FinduserInfoIdsIndex = getUserInfoIds.findIndex((user: User) => user.userId == dto?.userId)

        let userInfoIdbeforeUpdate = getUserInfoIds[FinduserInfoIdsIndex]

        let findUserRole: any = JSON.parse(localStorage.getItem("RolesDB") || "[]")
            .find((role: any) => role.name == dto?.role)

        let findUserGroups: number[] = dto.groups.map((groupId: getGroupModel) => groupId.id)

        getUsersData[FinduserDataIndex] = Object.assign({}, getUsersData[FinduserDataIndex], {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            password: dto.password
        })

        getUserInfoIds[FinduserInfoIdsIndex] = Object.assign({}, getUserInfoIds[FinduserInfoIdsIndex], { role: findUserRole.id, groups: findUserGroups })

        localStorage.setItem("UsersDB", JSON.stringify(getUsersData))

        localStorage.setItem("usersInfoDB", JSON.stringify(getUserInfoIds))

        return of((JSON.stringify(userDataBeforeUpdate) != JSON.stringify(getUsersData[FinduserDataIndex]))
            || (JSON.stringify(userInfoIdbeforeUpdate) != JSON.stringify(getUserInfoIds[FinduserInfoIdsIndex])))

    }

}