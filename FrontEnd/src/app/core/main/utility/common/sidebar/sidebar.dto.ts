export interface SidebarDto {
    sidebarData: sidebarData[]
}

export class sidebarData {
    userId: "";
    name: "";
    role: "";
    groups: [];
}