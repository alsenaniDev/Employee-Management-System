import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript"
import { Observable, of } from "rxjs";
import { getUserModel } from "../../../utility/Models/get-user-model.dto";
import { User } from "../show-users/UserDto";
import { AddUserDto } from "./AddUserDto";

@Injectable({ providedIn: "root" })

export class AddUserServices {
    constructor(private datePipe: DatePipe,) {

    }
    groups: any = [];
    roles: any = []
    Users: any = []
    userProfile: any = ""
    usersInfo: any = ""
    usersEmail: any;




    addUser(dto: AddUserDto): Observable<boolean> {
        let getUsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        let getUesrsInfoIds = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
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
        getUesrsInfoIds.push(userInfo)
        localStorage.setItem("usersInfoDB", JSON.stringify(getUesrsInfoIds))

        let FindUserInfoIds = getUesrsInfoIds?.find((user: getUserModel) => user.userId == userData.userId)
        let findUserData = getUesrsInfoIds?.find((user: User) => user.userId == userInfo.userId)
        return of(FindUserInfoIds && findUserData)
    }

}
