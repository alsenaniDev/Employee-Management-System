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
    private profileService: ProfileService,
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

    var editUserProfile = () => {
      this.profileService.EditUserInfo(userId, this.editForm)
      this.usersDataFun()
    }
    this.popupAlert.servicesAlert({
      header: "Edit Profile",
      message: "Are sure to edit User",
      operations: editUserProfile,
    })
  }

  changePassword(userId: string) {
    this.profileService.EditUserPass(userId, this.editPass, this.userInfo)
  }
}