import { Component, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getUserInfoModel, getUserModel } from '../../../utility/Models/get-user-model.dto';
import { AlertMessageServices } from '../../../utility/services/alert/AlertMessage.Services';
import { CommonService } from '../../../utility/services/common/settings.service';
import { SettingsDto } from '../../settings/Settings.Dto';
import { getGroupModel, getRoleModel } from '../show-users/Show-users-Dto';
import { UsersServices } from '../users.service';

import { AddUserDto } from './AddUserDto';

declare var $: any;
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

@Injectable({ providedIn: "root" })

export class AddUsersComponent {
  AddUserForm: FormGroup;
  UsersEmail = JSON.parse(localStorage.getItem("UsersDB") || "[]")
    .map((e: getUserModel) => e.email)
  Roles: SettingsDto[];
  Groups: SettingsDto[];
  userInfo: any

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public usersServices: UsersServices,
    private commonService: CommonService,
    private alrtMessage: AlertMessageServices,
    private userServices: UsersServices
  ) { }

  ngOnInit(): void {
    this.Init_AddUserForm();
    this.getGroups();
    this.getRoles()
    this.getUserInfoById()
    this.AddUserForm.value.email = ""
  }
  controls = [
    {
      title: 'First Name',
      controlName: 'fname',
      type: "text"
    },
    {
      title: 'Last Name',
      controlName: 'lname',
      type: "text"
    },

    {
      title: 'Email',
      controlName: 'email',
      type: "email"
    },
    {
      title: 'Password',
      controlName: 'password',
      type: "password"
    },
    {
      title: 'Phone Number',
      controlName: 'phoneNumber',
      type: "text"
    },
  ];


  Init_AddUserForm() {
    this.AddUserForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      groups: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getUserInfoById() {
    this.userServices.getUserInfoById().subscribe({
      next: (res: getUserInfoModel) => {
        this.userInfo = res
        console.log('====================================');
        console.log(this.userInfo);
        console.log('====================================');
      },
      error: (err: any) => {
        return err;
      }
    })
  }



  AddUser() {

    if (this.AddUserForm.invalid) {
      this.AddUserForm.markAllAsTouched()
    }
    else if (this.UsersEmail.includes(this.AddUserForm.value.email)) {
      this.AddUserForm.invalid
    } else {
      let dto: AddUserDto = {
        email: this.AddUserForm.value.email,
        firstName: this.AddUserForm.value.fname,
        lastName: this.AddUserForm.value.lname,
        password: this.AddUserForm.value.password,
        phoneNumber: this.AddUserForm.value.phoneNumber,
        roleId: this.AddUserForm.value.role,
        groupsId: this.AddUserForm.value.groups,
        CreatedBy: this.userInfo?.userId
      }
      this.usersServices.addUser(dto).subscribe({
        next: (res: string) => {
          if (res) {
            this.router.navigateByUrl("/main/show-users")
          }
        }, error: (err: any) => {
          return err
        }
      })
    }

  }

  getRoles() {
    this.commonService.getRoles().subscribe({
      next: (res: SettingsDto[]) => {
        this.Roles = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }

  getGroups() {
    this.commonService.getGroups().subscribe({
      next: (res: SettingsDto[]) => {
        this.Groups = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }

}
