import { Injectable } from '@angular/core';
import { ServiceRoles } from 'src/app/core/main/utility/services/common/serviceRoles.service';
import { Permission } from '../permission';

@Injectable({
    providedIn: "root",
})

export class ServiceRolesPermission {

     serviceRolesPermission: any;
    constructor(private serviceRoles: ServiceRoles) {  }

     getServiceRoles() {

        this.serviceRoles.getServiceRoles().subscribe({
            next: (res: any) => {
                Permission.setServiceRoles(res)
                console.log(Permission.getServiceRoles());
                localStorage.setItem("serviceRoles", JSON.stringify(res))
            }, error(err: any) {
                console.log(err);
            },
        })
    }

}