import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { getGroupModel, getRoleModel } from "../user-Pages/show-users/Show-users-Dto";
import { User } from "../../pages/user-Pages/show-users/UserDto";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";
import { getUserModel } from "../../utility/Models/get-user-model.dto";
import { UpdateUserInfoDto, UpdateUserPasswordDto } from "./profile.dto";
import { HttpClient } from "@angular/common/http";
import { ProfileProxy } from "./profile.proxy"

@Injectable({
    providedIn: "root",
})

export class ProfileService {

    constructor(private router: Router, private http: HttpClient) {

    }

    getUsersData() {
        return this.http.get<getUserInfoModel[]>(ProfileProxy.GET_USERS_DATA)
    }

    getUserInfoById(userId: string) {
        return this.http.get<getUserInfoModel>(ProfileProxy.GET_USER_INFO_BY_ID + userId);
    }

    UpdateUserInformation(dto: UpdateUserInfoDto) {
        return this.http.put<UpdateUserInfoDto>(ProfileProxy.UPDATE_PROFILE_INFO + dto.userId, dto)
    }

    UpdateUserPassword(dto: UpdateUserPasswordDto) {
        return this.http.put<UpdateUserInfoDto>(ProfileProxy.UPDATE_PROFILE_PASSWORD + dto.userId, dto)
    }
}