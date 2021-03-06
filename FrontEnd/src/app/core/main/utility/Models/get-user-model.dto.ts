import { SettingsDto } from "../../pages/settings/Settings.Dto";
import { getGroupModel } from "../../pages/user-Pages/show-users/Show-users-Dto";

export class getUserModel {
    CreatedAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: number;
    userId: string;
    CreatedBy: string;
}

export class getUserInfoModel extends getUserModel {
    role: SettingsDto;
    groups: getGroupModel[];
}