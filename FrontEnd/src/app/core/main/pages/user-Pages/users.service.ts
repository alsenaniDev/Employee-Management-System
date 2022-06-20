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
        let userId = JSON.parse(localStorage.getItem('userInfo'))
        console.log(ShowUsersProxy.SHOW_USERS_PROXY + userId?.data?.userId);

        return this.http.get<getUserInfoModel[]>(ShowUsersProxy.SHOW_USERS_PROXY + userId?.data?.userId)
    }

    getUserInfoById() {
        let userId = JSON.parse(localStorage.getItem("userInfo") || "")
        return this.http.get<getUserInfoModel>(ShowUsersProxy.SHOW_USER_BY_ID_PROXY + userId.data.userId)
    }

    DeleteUser(userId: string) {
        return this.http.delete<string>(ShowUsersProxy.DELETE_USER_PROXY + userId)
    }

    DeleteSelectUser(usersSelect: string[]): Observable<any> {
        return this.http.delete<string>(ShowUsersProxy.DELETE_SELECTED_USERS_PROXY, { body: { "usersSelect": usersSelect } })

        // must be :
        // {"usersSelect": [.., .., ..] }} 

        // WE DID
        //  [.., .., ..] 

        // THE FIX
        // {"usersSelect": [.., .., ..] }} 


    }

    UpdateUserInfo(body: UpdateUserInfoDto) {
        return this.http.put<UpdateUserInfoDto>(ShowUsersProxy.UPDATE_USER_PROXY + body.userId, body)
    }


    addUser(body: AddUserDto) {

        return this.http.post<string>(ShowUsersProxy.ADD_USER_PROXY, body)
        // let getUsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        // let getUsersInfoIds = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
        // let userFound = JSON.parse(localStorage.getItem("userInfo") || "null")


        // let guid = Guid.create().toJSON();
        // let userGuid = guid.value


        // let userData = {
        //     userId: userGuid,
        //     firstName: dto.firstName,
        //     lastName: dto.lastName,
        //     email: dto.email,
        //     password: dto.password,
        //     phoneNumber: dto.phoneNumber,
        //     CreatedBy: userFound.userId,
        //     CreatedAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
        // }

        // getUsersData.push(userData)
        // localStorage.setItem("UsersDB", JSON.stringify(getUsersData))

        // const userInfo = {
        //     userId: userGuid,
        //     role: dto.role,
        //     groups: dto.groups
        // }
        // getUsersInfoIds.push(userInfo)
        // localStorage.setItem("usersInfoDB", JSON.stringify(getUsersInfoIds))

        // let FindUserInfoIds = getUsersInfoIds?.find((user: getUserModel) => user.userId == userData.userId)
        // let findUserData = getUsersInfoIds?.find((user: User) => user.userId == userInfo.userId)
        // return of(FindUserInfoIds && findUserData)
    }

}