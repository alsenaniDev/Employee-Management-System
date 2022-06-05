import { getGroupModel, getRoleModel, getUserModel } from "../users/show-users/Show-users-Dto";

export interface ProfileDto {
    userData: UserData[]
}

export class UserData {
    userId: "";
    name: "";
    role: "";
    groups: [];
}
export class getUserInfoModel extends getUserModel {
    role : getRoleModel;
    groups : getGroupModel[];
  }