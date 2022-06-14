export interface UpdateUserInfoDto {
    userId: string,
    firstName: string,
    lastName: string,
    phoneNumber: number
}

export interface UpdateUserPasswordDto {
    userId: string,
    password: string
}