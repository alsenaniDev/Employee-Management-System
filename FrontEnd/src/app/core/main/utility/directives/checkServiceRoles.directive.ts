import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { Permission } from 'src/app/core/utility/permission';
import { ServiceRoles } from '../services/common/serviceRoles.service';

@Directive({
    selector: '[checkServiceRoles]'
})

export class CheckServiceRoles implements AfterViewInit {
    @Input("checkServiceRoles") serviceCode: string
    @Input("roleId") roleId: string
    userProfile: any
    serviceRoleFound: any
    constructor(private serviceRoles: ServiceRoles, private elementRef: ElementRef) { }



    ngAfterViewInit() {
        let data = JSON.parse(localStorage.getItem("userInfo") || "null");
        let res = JSON.parse(localStorage.getItem("serviceRoles") || "[]")
        this.userProfile = data.data

        this.serviceRoleFound = res?.find((service: any) => service.serviceId.code == this.serviceCode)
        if (!this.serviceRoleFound?.rolesIds.includes(this.userProfile.roleId)) {
            this.elementRef.nativeElement.style.display = 'none';
        }
    }
}