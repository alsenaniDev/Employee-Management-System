import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { groupsStats, rolesStats } from "./stats-card.dto";
import { StatsCardProxy } from "./stats-card.proxy";

@Injectable({ providedIn: "root" })
export class StatsCardServices {

    constructor(private http: HttpClient) { }


    getUsersRolesStats() {
        return this.http.get<any>(StatsCardProxy.SHOW_USERS_ROLES_STATS)
    }

    getUsersGroupsStats() {
        return this.http.get<any>(StatsCardProxy.SHOW_USERS_GROUPS_STATS)
    }

}