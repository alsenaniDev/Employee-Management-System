import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = [];
  Users: any = [];
  userInfo: any = []
  editForm: FormGroup
  editPass: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private profileService: ProfileService) {
    this.editPass = this.fb.group({
      currentPassword: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    })

  }

  ngOnInit(): void {
    console.log(this.userInfo.password)
    this.userProfile = this.profileService.userProfile
    this.Users = this.profileService.Users
    this.userInfo = this.profileService.userInfo
    this.Init_UpdateUserInfoForm(this.userInfo)
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
      console.log(this.editPass.value.currentPassword)
      this.editPass.markAllAsTouched()
    }
    else if (this.editPass.value.currentPassword != this.userInfo.password) {
      this.editPass.invalid
    }
    else if (this.editPass.value.password != this.editPass.value.confirmPassword) {
      this.editPass.invalid
    } else {
      let userIndex = this.Users.findIndex((user: any) => user.userId == this.userInfo.userId)
      this.Users[userIndex] = Object.assign({}, this.Users[userIndex], { password: this.editPass.value.password })
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))
      this.router.navigateByUrl("/login")
    }
  }

  onEnterPassword() {
    const reEnterPass = document.getElementById('reEnterPass') as HTMLInputElement | null;
    const newPass = document.getElementById('newPass') as HTMLInputElement | null;
    if (this.editPass.value.currentPassword != this.userInfo.password) {
      reEnterPass.getElementsByTagName("input")[0].setAttribute('disabled', '')
      newPass.getElementsByTagName("input")[0].setAttribute('disabled', '')
    } else {
      reEnterPass.getElementsByTagName("input")[0].removeAttribute('disabled')
      newPass.getElementsByTagName("input")[0].removeAttribute('disabled')
    }
  }
}
