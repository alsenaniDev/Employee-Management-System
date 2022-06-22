import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { getUserModel } from "../../utility/Models/get-user-model.dto";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getGroupModel, getRoleModel } from "./show-users/Show-users-Dto";
import { UpdateUserInfoDto, User } from "./show-users/UserDto";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ShowUsersProxy } from "./users.proxy";
import { AddUserDto } from "./add-user/AddUserDto";
import { Guid } from "guid-typescript";
import { getAllUsersModelDto, pagedResultRequest } from "../../utility/Models/pagedResult.dto";


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
    }

    UpdateUserInfo(body: UpdateUserInfoDto) {
        return this.http.put<UpdateUserInfoDto>(ShowUsersProxy.UPDATE_USER_PROXY + body.userId, body)
    }


    addUser(body: AddUserDto) {

        return this.http.post<string>(ShowUsersProxy.ADD_USER_PROXY, body)
    }

    GetUserPaginator(request: getAllUsersModelDto) {
        let userId = JSON.parse(localStorage.getItem("userInfo"))
        return this.http.post<any>(ShowUsersProxy.GET_USERS_PAGINATOR + userId.data.userId + "/", { request })
    }

}