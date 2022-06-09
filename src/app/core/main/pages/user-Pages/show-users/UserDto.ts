import { getGroupModel, getRoleModel } from "./Show-users-Dto";

export interface User {
    userId: any,
    role: number,
    groups: number[],
}

export interface UpdateUserInfoDto {
    userId: string,
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: number;
    role: getRoleModel,
    groups: getGroupModel[]
}