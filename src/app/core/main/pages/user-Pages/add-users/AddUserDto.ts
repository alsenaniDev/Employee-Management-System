import { getGroupModel, getRoleModel } from "../show-users/Show-users-Dto";

export interface AddUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: number;
    role?: getRoleModel,
    groups?: getGroupModel
}