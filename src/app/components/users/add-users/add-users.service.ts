import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript"

@Injectable({ providedIn: "root" })

export class AddUserServices {
    constructor(private datePipe: DatePipe,) {

    }
    groups: any = [];
    roles: any = []
    Users: any = []
    userProfile: any = ""
    usersInfo: any = ""
    usersEmail: any;

    bindData() {
        this.Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
        this.usersEmail = this.Users.map((user: any) => user.email)
        this.groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
        this.roles = JSON.parse(localStorage.getItem("RolesDB") || '[]')
        this.userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
        this.usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
    }

    addUser(SignUpForm: any) {
        if (SignUpForm.invalid) {
            SignUpForm.markAllAsTouched()
        } else if (this.usersEmail.includes(SignUpForm.value.email)) {
            SignUpForm.invalid
        } else {
            let guid = Guid.create().toJSON();
            let userGuid = guid.value

            let user = {
                userId: userGuid,
                firstName: SignUpForm.value.fname,
                lastName: SignUpForm.value.lname,
                email: SignUpForm.value.email,
                password: SignUpForm.value.password,
                phoneNumber: SignUpForm.value.phoneNumber,
                CreatedBy: this.userProfile.userId,
                CreatedAt: this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
            }

            this.Users.push(user)
            localStorage.setItem("UsersDB", JSON.stringify(this.Users))

            const userInfo = {
                userId: userGuid,
                role: SignUpForm.value.role,
                groups: SignUpForm.value.groups
            }

            if (this.usersInfo != null) {
                this.usersInfo.push(userInfo)
                localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfo))
            } else {
                let newUser = [{
                    userId: userGuid,
                    role: SignUpForm.value.role,
                    groups: SignUpForm.value.groups
                }]
                localStorage.setItem("usersInfoDB", JSON.stringify(newUser))
            }
            SignUpForm.reset()
        }
    }
}