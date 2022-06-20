import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessageServices } from '../../../utility/services/alert/AlertMessage.Services';
import { popupAlertMessage } from '../../../utility/services/alert/popupAlert.services';
import { getUserInfoModel } from '../../../utility/Models/get-user-model.dto';
import { getUserModel } from '../../../utility/Models/get-user-model.dto';
import { getGroupModel, getRoleModel } from './Show-users-Dto';
import { UsersServices } from '../users.service';
import { UpdateUserInfoDto } from './UserDto';
import { CommonService } from '../../../utility/services/common/settings.service';
import { SettingsDto } from '../../settings/Settings.Dto';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent {
  @ViewChild("check") check: ElementRef["nativeElement"]
  EditUserInfoForm: FormGroup;
  UsersData: getUserModel[];
  Groups: SettingsDto[]
  Roles: SettingsDto[]
  selectedUsers: getUserInfoModel[]
  selectedRole: any
  selectedGroup: any
  UserDialog!: boolean;
  checkInput!: any
  userGroupsSelect: any[]
  usersDataInfo: getUserInfoModel[]
  userInfo: any
  userDetails: getUserInfoModel
  usersGroups: getGroupModel[]
  UserRole: any
  validation: boolean
  show = true

  constructor(
    private userServices: UsersServices,
    private commonService: CommonService,
    private fb: FormBuilder,
    private popupServices: popupAlertMessage,
    private alertMessage: AlertMessageServices,

  ) {
  }

  ngOnInit() {
    this.Init_UpdateUserInfoForm();
    this.getUserInfo()
    this.getUserInfoById()
    this.getGroups()
    this.getRoles()
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
      title: 'Phone Number',
      controlName: 'phoneNumber',
      type: "text",
    },
    {
      title: 'Password',
      controlName: 'password',
      type: "password"
    }
  ];


  getUserInfo() {
    this.userServices.getUsersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        this.usersDataInfo = res
        this.show = false;
      }, error: (err: any) => {
        return err;
      }
    })
  }

  getUserInfoById() {
    this.userServices.getUserInfoById().subscribe({
      next: (res: getUserInfoModel) => {
        this.userInfo = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }

  getRoles() {
    this.commonService.getRoles().subscribe({
      next: (res: SettingsDto[]) => {
        this.Roles = res
        // if (this.userInfo?.role == "Admin" || this.userInfo?.role == "Super-Admin") {

        // } else {
        //   this.Roles = res.filter((role: SettingsDto) => role.name == this.userInfo?.role)
        // }
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
        // if (this.userInfo?.role == "Admin" || this.userInfo?.role == "Super-Admin") {

        // } else {
        //   this.Groups = res.filter((group: SettingsDto) => this.userInfo?.groups.includes(group.name))
        // }
      },
      error: (err: any) => {
        return err;
      }
    })
  }



  Init_UpdateUserInfoForm(userDetails?: getUserInfoModel) {

    this.EditUserInfoForm = this.fb.group({
      userId: [userDetails?.userId],
      fname: [userDetails?.firstName, [Validators.required, Validators.minLength(3)]],
      lname: [userDetails?.lastName, [Validators.required, Validators.minLength(3)]],
      email: [userDetails?.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phoneNumber: [userDetails?.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      password: [userDetails?.password, [Validators.required, Validators.minLength(6)]],
      role: [this.UserRole?.name, Validators.required],
      groups: [this.userGroupsSelect, Validators.required],
    })
    console.log(this.EditUserInfoForm.value.groups)


  }

  UpdateUserInfo() { // updateb-> call backend
    if (this.EditUserInfoForm.invalid) {
      this.EditUserInfoForm.markAllAsTouched()
    }
    else {
      const userDto: UpdateUserInfoDto = {
        userId: this.EditUserInfoForm.value.userId,
        firstName: this.EditUserInfoForm.value.fname,
        lastName: this.EditUserInfoForm.value.lname,
        email: this.EditUserInfoForm.value.email,
        phoneNumber: this.EditUserInfoForm.value.phoneNumber,
        password: this.EditUserInfoForm.value.password,
        roleId: this.EditUserInfoForm.value.role._id,
        groupsId: this.EditUserInfoForm.value.groups.map((g: SettingsDto) => g._id),
      }
      this.userServices.UpdateUserInfo(userDto).subscribe({
        next: (res: any) => {
          if (res) {
            this.alertMessage.success("The User is updated")
            this.getUserInfo()
          } else {
            this.alertMessage.Warning("The User Was Not Update")
          }
          this.UserDialog = false;
        }, error: (err: any) => {
          this.UserDialog = false;
          return err
        }
      })
    }

  }



  ToggleUpdateUserInfo(userFormDto: getUserInfoModel) { // popup
    this.UserDialog = !this.UserDialog;
    if (this.UserDialog) {
      this.Init_UpdateUserInfoForm(userFormDto)
      this.userGroupsSelect = this.Groups.filter((group: any) =>
        userFormDto.groups.includes(group.name))
      this.UserRole = this.Roles.find((g: any) => g.name == userFormDto.role)
    }
  }

  deleteUser(userId: any) {

    this.popupServices.servicesAlert({
      header: "Confirm",
      message: 'Are you sure you want to delete This User ?',
      operations: () => {
        this.userServices.DeleteUser(userId).subscribe({
          next: (res: string) => {
            if (res) {
              this.alertMessage.success("The User is Delete")
            } else {
              this.alertMessage.Warning("The User Was Not Delete")
            }
          }, error: (err: any) => {
            return err
          }
        });
        this.getUserInfo()
      }
    })

  }

  deleteSelectedUsers() {
    this.popupServices.servicesAlert({
      header: "Confirm",
      message: 'Are you sure you want to delete This Users ?',
      operations: () => {
        const usersSelect = this.selectedUsers.map((id: getUserInfoModel) => id.userId)
        this.userServices.DeleteSelectUser(usersSelect).subscribe({
          next: (res) => {
            if (res) {
              this.alertMessage.success(res.message)
              this.selectedUsers = []
              this.getUserInfo()
            }
          }, error: (err: any) => {
            this.alertMessage.error("Action Valid")
          }
        })
      }
    })
  }

  hideDialog() {
    this.UserDialog = false;;
  }

  filterTableData(role: any, group: any) {
    this.userServices.getUsersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        if ((role) && (group && group?.length != 0)) {
          this.usersDataInfo = res.filter((user: any) => (user.userId != this.userInfo.userId)
            && (user.role == role
              && user.groups.find((g: getGroupModel) => group?.includes(g)))
          )
        }
        else if (role || group && group?.length != 0) {
          this.usersDataInfo = res.filter((user: any) => (user.userId != this.userInfo.userId)
            && (user.role == role
              || user.groups?.find((g: getGroupModel) => group?.includes(g)))
          )
        }
        else {
          this.usersDataInfo = res
        }
      }, error: (err: any) => {
        return err;
      }
    })
  }

  checkuserRole(userRole: any, superRole?: string) {
    return this.userInfo?.role == userRole || this.userInfo?.role == superRole;
  }

  checkSuperRole(usersInfo: any, userInfoRole: string, superRole: string) {

    return ((usersInfo?.role == userInfoRole || usersInfo?.role == superRole) && (this.userInfo?.role != superRole || usersInfo?.role == superRole))
  }


  clearGroup() {
    this.selectedGroup = undefined;
    this.filterTableData(this.selectedRole, this.selectedGroup)
  }

  clearRole() {
    this.selectedRole = undefined;
    this.filterTableData(this.selectedRole, this.selectedGroup)
  }

  checkSelectedUsers(selectedUsers: any) {
    let usersSelect = selectedUsers?.map((check: any) => check.role)
    return usersSelect?.includes("Super-Admin") || (usersSelect?.includes("Admin") && this.userInfo?.role != 'Super-Admin')
  }

}