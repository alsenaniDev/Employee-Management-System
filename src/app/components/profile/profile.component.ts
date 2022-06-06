import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MessageService } from 'primeng/api';
import { AlertMessageServices } from '../AlertMessage.Services';
import { popupAlertMessage } from '../popupAlert.services';
import { getUserModel } from '../users/show-users/Show-users-Dto';
import { getUserInfoModel, UserData } from './profile.dto';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Users: getUserModel[];
  userInfo: getUserInfoModel
  editForm: FormGroup
  editPass: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private messageAlert: AlertMessageServices,
    private popupAlert: popupAlertMessage
  ) {


  }

  ngOnInit(): void {
    this.usersDataFun()
    this.userInformation()
    this.Init_UpdateUserInfoForm(this.userInfo)
    this.Init_UpdateUserPasswordForm()

  }

  Init_UpdateUserInfoForm(userInfo: any) {
    this.editForm = this.fb.group({
      firstName: [userInfo.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [userInfo.lastName, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [userInfo.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]]
    })

  }

  Init_UpdateUserPasswordForm() {
    this.editPass = this.fb.group({
      currentPassword: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  usersDataFun() {
    this.profileService.usersData().subscribe({
      next: (res: getUserModel[]) => {
        this.Users = res;
      },
      error: (err: any) => {
        return err;
      }
    })
  }

  userInformation() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "")
    this.profileService.getUserInfoById(userInfo.userId).subscribe({
      next: (res: getUserInfoModel) => {
        this.userInfo = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }

  editProfile(userId: string) {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched()
    }

    else {
      var editUserProfile = () => {
        let userIndex = this.Users.findIndex((user: any) => user.userId == userId)
        this.Users[userIndex] = Object.assign({}, this.Users[userIndex],
          {
            firstName: this.editForm.value.firstName,
            lastName: this.editForm.value.lastName,
            phoneNumber: this.editForm.value.phoneNumber
          })
        localStorage.setItem("UsersDB", JSON.stringify(this.Users));
        this.messageAlert.success("The Profile Is Edit")
      }
      this.popupAlert.servicesAlert({
        header: "Edit Profile",
        message: "Are sure to edit User",
        operations: editUserProfile,
      })
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
    }

    else {
      let userIndex = this.Users.findIndex((user: any) => user.userId == this.userInfo.userId)
      this.Users[userIndex] = Object.assign({}, this.Users[userIndex], { password: this.editPass.value.password })
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))
      this.router.navigateByUrl("/login")
    }
  }
}





