export class Permission {
    static SERVICE_ROLES : any 

    static getServiceRoles(): any {
        return this.SERVICE_ROLES
    }

    static setServiceRoles(value: any) {
        this.SERVICE_ROLES = value;
    }
}
