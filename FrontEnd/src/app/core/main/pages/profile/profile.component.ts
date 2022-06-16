import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getUserModel } from '../../utility/Models/get-user-model.dto';
import { getUserInfoModel } from '../../utility/Models/get-user-model.dto';
import { ProfileService } from './profile.service';
import { UpdateUserInfoDto, UpdateUserPasswordDto } from './profile.dto';
import { AlertMessageServices } from '../../utility/services/alert/AlertMessage.Services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Users: getUserModel[];
  userInfo: getUserInfoModel
  UpdateUserInfoForm: FormGroup
  UpdateUserPasswordForm: FormGroup

  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private alertMessage: AlertMessageServices,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    this.getUsersData()
    this.getUserInfoById()
    this.Init_UpdateUserInfoForm(this.userInfo)
    this.Init_UpdateUserPasswordForm()

  }

  Init_UpdateUserInfoForm(userInfo: any) {
    this.UpdateUserInfoForm = this.fb.group({
      firstName: [userInfo.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [userInfo.lastName, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [userInfo.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]]
    })

  }

  Init_UpdateUserPasswordForm() {
    this.UpdateUserPasswordForm = this.fb.group({
      currentPassword: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  getUsersData() {
    this.profileService.getUsersData().subscribe({
      next: (res: getUserModel[]) => {
        this.Users = res;
      },
      error: (err: any) => {
        return err;
      }
    })
  }

  getUserInfoById() {
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

  UpdateUserInfo(userId: string) {
    if (this.UpdateUserInfoForm.invalid) {
      this.UpdateUserInfoForm.markAllAsTouched()
      return;
    }

    const dto: UpdateUserInfoDto = {
      userId: userId,
      firstName: this.UpdateUserInfoForm.value.firstName,
      lastName: this.UpdateUserInfoForm.value.lastName,
      phoneNumber: this.UpdateUserInfoForm.value.phoneNumber
    }
    this.profileService.UpdateUserInformation(dto).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.alertMessage.success("The Information is Update")
          this.getUsersData()
        }
        else {
          this.alertMessage.Warning("The Information is Not Change")

        }
      }, error: (err: any) => {
        if (err) {
          this.alertMessage.error("There is an error")
        }
      }

    })

  }

  UpdateUserPassword(userId: string) {
    if (this.UpdateUserPasswordForm.invalid) {
      return this.UpdateUserPasswordForm.markAllAsTouched()
    }

    else if (this.UpdateUserPasswordForm.value.currentPassword != this.userInfo?.password) {
      return this.UpdateUserPasswordForm.valid
    }

    else if (this.UpdateUserPasswordForm.value.password != this.UpdateUserPasswordForm.value.confirmPassword) {
      return this.UpdateUserPasswordForm.valid
    }

    else {
      const dto: UpdateUserPasswordDto = {
        userId: userId,
        password: this.UpdateUserPasswordForm.value.password
      }
      this.profileService.UpdateUserPassword(dto).subscribe({
        next: (res: boolean) => {
          if (res) {
            this.router.navigateByUrl("/account/login")
          } else {
            this.alertMessage.Warning("The Information is Not Change")
          }
        }, error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
}