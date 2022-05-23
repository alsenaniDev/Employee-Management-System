import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  editPass: FormGroup
  constructor(private fb: FormBuilder , private router : Router) {
    this.editPass = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    })
    this.Init_UpdateUserInfoForm(this.userInfo)
  }

  ngOnInit(): void {
  }

  Init_UpdateUserInfoForm(userInfo: any) {
    this.editForm = this.fb.group({
      firstName: [userInfo.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [userInfo.lastName, [Validators.required, Validators.minLength(3)]],
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
    if (this.editPass.invalid) {
      this.editPass.markAllAsTouched()
    } else if (this.editPass.value.password != this.editPass.value.confirmPassword) {
      this.editPass.invalid
    } else {
      let userIndex = this.Users.findIndex((user: any) => user.userId == this.userInfo.userId)
      this.Users[userIndex] = Object.assign({}, this.Users[userIndex], { password: this.editPass.value.password })
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))
      this.router.navigateByUrl("/login")
    }

  }
}
