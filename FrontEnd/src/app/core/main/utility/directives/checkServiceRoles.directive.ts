import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ServiceRoles } from '../services/common/serviceRoles.service';

@Directive({
    selector: '[checkServiceRoles]'
})

export class CheckServiceRoles {
    @Input("checkServiceRoles") serviceCode: string
    @Input("roleId") roleId: string
    userProfile: any
    constructor(private serviceRoles: ServiceRoles, private elementRef: ElementRef) { }

    ngAfterViewInit() {
        let data = JSON.parse(localStorage.getItem("userInfo") || "null");
        this.userProfile = data.data
        this.serviceRoles.getServiceRoles().subscribe({
            next: (res) => {
                let serviceFound = res.find((service) => service.serviceId.code == this.serviceCode)
                if (serviceFound) {
                    if (!serviceFound.rolesIds.map((roleId: any) => roleId._id).includes(this.userProfile.roleId)) {
                        this.elementRef.nativeElement.style.display = 'none';
                    }
                } else {
                    this.elementRef.nativeElement.style.display = 'none';
                }
            }, error(err) {
                console.log(err);
            },
        })
    }
}