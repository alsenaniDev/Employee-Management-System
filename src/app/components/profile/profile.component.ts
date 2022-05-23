import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null");
  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]");
  userInfo = this.Users.find((user: any) => user.userId == this.userProfile.userId);

  editForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.Init_UpdateUserInfoForm(this.userInfo)
  }

  ngOnInit(): void {

  }

  Init_UpdateUserInfoForm(userInfo: any) {
    this.editForm = this.fb.group({
      firstName: [userInfo.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [userInfo.lastName, [Validators.required, Validators.minLength(3)]],
      password: [userInfo.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [userInfo.password, [Validators.required, Validators.minLength(6)]],
      phoneNumber: [userInfo.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]]
    })
  }
  editProfile() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched()
      
    } else {
      let userIndex = this.Users.findIndex((user: any) => user.userId == this.userInfo.userId)
      this.Users[userIndex] = Object.assign({}, this.Users[userIndex], { firstName: this.editForm.value.firstName, lastName: this.editForm.value.lastName, phoneNumber: this.editForm.value.phoneNumber })
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))
     
    }

  }
  changePassword() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched()

    } else if (this.editForm.value.password != this.editForm.value.confirmPassword) {

      this.editForm.invalid


    } else {
      let userIndex = this.Users.findIndex((user: any) => user.userId == this.userInfo.userId)
      this.Users[userIndex] = Object.assign({}, this.Users[userIndex], { password: this.editForm.value.password })
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))
    }
  }
}
