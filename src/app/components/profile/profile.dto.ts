export interface ProfileDto {
    userData: UserData[]
}

export class UserData {
    userId: "";
    name: "";
    role: "";
    groups: [];
}