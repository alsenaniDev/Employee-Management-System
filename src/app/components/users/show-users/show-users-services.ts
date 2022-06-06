import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AlertMessageServices } from "../../AlertMessage.Services";
import { popupAlertMessage } from "../../popupAlert.services";
import { getUserInfoModel } from "../../profile/profile.dto";
import { getGroupModel, getRoleModel, getUserModel } from "./Show-users-Dto";
import { User } from "./UserDto";

@Injectable({ providedIn: "root" })
export class ShowUserServices {
    UsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
    Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))

    constructor(private popupServices: popupAlertMessage, private alertMessage: AlertMessageServices) { }

    usersInfoData(): Observable<getUserInfoModel[]> {
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

    DeleteUser(userId: string) {

        let userInfo: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
        let userInfoIndex = userInfo.findIndex((user: any) => user.userId == userId)
        userInfo.splice(userInfoIndex, 1)
        localStorage.setItem("usersInfoDB", JSON.stringify(userInfo))
        let UsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let userIndex = UsersData.findIndex((user: any) => user.userId == userId)
        this.UsersData.splice(userIndex, 1)
        localStorage.setItem("UsersDB", JSON.stringify(this.UsersData))
        this.alertMessage.success("The User is Delete")
    }

    DeleteSelectUser(usersSelect: any[]) {
        let userInfo: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
            .filter((user: any) =>
                !usersSelect.find((userr: any) => userr.userId == user.userId))
        localStorage.setItem("usersInfoDB", JSON.stringify(userInfo))

        let UsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]").filter((user: getUserModel) =>
            !usersSelect?.find((id: any) => id.userId == user.userId))
        localStorage.setItem("UsersDB", JSON.stringify(UsersData))

        this.alertMessage.success("The Users is Deleted")
    }

    EditUser(userInfo: getUserInfoModel, formName: FormGroup) {
        if (formName.invalid) {
            formName.markAllAsTouched()
        } else {
            let userData: getUserModel[] = JSON.parse(localStorage.getItem("UsersDB") || "[]")
            let userDataIndex = userData.findIndex((user: getUserModel) => user.userId == userInfo?.userId)

            let userInformation: User[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
            let userInfoIndex = userInformation.findIndex((user: User) => user.userId == userInfo?.userId)

            let findUserRole: getRoleModel = JSON.parse(localStorage.getItem("RolesDB") || "[]")
                .find((role: getRoleModel) => role.name == formName.value.role)

            let findGroups: getGroupModel[] = formName.value.groups.map((groupId: getGroupModel) => groupId.id)

            userData[userDataIndex] = Object.assign({}, userData[userDataIndex], {
                firstName: formName.value.fname,
                lastName: formName.value.lname,
                email: formName.value.email,
                phoneNumber: formName.value.phoneNumber,
                password: formName.value.password
            })
            localStorage.setItem("UsersDB", JSON.stringify(userData))
            userInformation[userInfoIndex] = Object.assign({}, userInformation[userInfoIndex], { role: findUserRole.id, groups: findGroups })
            localStorage.setItem("usersInfoDB", JSON.stringify(userInformation))


        }
    }

}