import { Injectable } from "@angular/core";
import { UsersServices } from "../../pages/user-Pages/users.service";
import { getUserInfoModel } from "../../utility/Models/get-user-model.dto";

@Injectable({ providedIn: "root" })
export class StatsCardServices {

    constructor() { }



    userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
    usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")



}