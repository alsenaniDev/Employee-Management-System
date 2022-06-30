import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ServiceRolesProxy } from "./serviceRoles.proxy";

@Injectable({
    providedIn: "root",
})

export class ServiceRoles {
    constructor(private http: HttpClient) { }

    getServiceRoles() {
        return this.http.get<any[]>(ServiceRolesProxy.GET_SERVICE_ROLES);
    }
}