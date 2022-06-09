import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertMessageServices } from '../../../utility/services/AlertMessage.Services';
import { popupAlertMessage } from '../../../utility/services/popupAlert.services';
import { getUserInfoModel } from '../../../utility/Models/get-user-model.dto';
import { getUserModel } from '../../../utility/Models/get-user-model.dto';
import { getGroupModel, getRoleModel } from './Show-users-Dto';
import { ShowUserServices } from './show-users.service';
import { UpdateUserInfoDto } from './UserDto';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent {
  EditUserInfoForm: FormGroup;
  UsersData: getUserModel[];
  Groups: getGroupModel[]
  Roles: getRoleModel[]
  selectedUsers: getUserInfoModel[]
  selectedRole: any
  selectedGroup: any
  UserDialog!: boolean;
  submitted!: boolean;
  checkInput: boolean = false;
  userGroupsSelect: any[]
  usersDataInfo: getUserInfoModel[]
  userInfo: any
  userDetails: getUserInfoModel
  usersGroups: getGroupModel[]

  constructor(
    private userServices: ShowUserServices,
    private fb: FormBuilder,
    private popupServices: popupAlertMessage,
    private alertMessage: AlertMessageServices

  ) {

  }

  ngOnInit() {

    this.Init_UpdateUserInfoForm();
    this.getUserInfo()
    this.getuserInfoById()
    this.getGroups()
    this.getRoles()
    this.usersDataInfo = this.usersDataInfo.filter((user: getUserInfoModel) => user.userId != this.userInfo?.userId)
    if (this.userInfo?.role !== "Admin" && this.userInfo?.role !== "Super-Admin") {
      this.Groups = this.Groups.filter((group: getGroupModel) => this.userInfo.groups.includes(group.name))
    }
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
      type: "text"
    },
    {
      title: 'Phone Number',
      controlName: 'phoneNumber',
      type: "text"
    },
    {
      title: 'Password',
      controlName: 'password',
      type: "password"
    }

  ];


  getUserInfo() {
    this.getuserInfoById()
    this.userServices.getUsersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        this.usersDataInfo = res
      }, error: (err: any) => {
        return err;
      }
    })
  }

  getuserInfoById() {
    let userInfoData = JSON.parse(localStorage.getItem("userInfo") || "")
    this.userServices.getUserInfoById(userInfoData.userId).subscribe({
      next: (res: getUserInfoModel) => {
        this.userInfo = res
      },
      error: (err: any) => {
        return err;

      }
    })
  }
  getRoles() {
    this.userServices.getRoles().subscribe({
      next: (res: getRoleModel[]) => {
        this.Roles = res
      },
      error: (err: any) => {
        return err;
      }
    })
  }
  getGroups() {
    this.userServices.getGroups().subscribe({
      next: (res: getGroupModel[]) => {
        this.Groups = res
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
      role: [userDetails?.role, Validators.required],
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
        role: this.EditUserInfoForm.value.role,
        groups: this.EditUserInfoForm.value.groups,
      }
      this.userServices.UpdateUserInfo(userDto).subscribe({
        next: (res: boolean) => {
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
    }
  }

  deleteUser(userId: any) {

    this.popupServices.servicesAlert({
      header: "Confirm",
      message: 'Are you sure you want to delete This User ?',
      operations: () => {
        this.userServices.DeleteUser(userId).subscribe({
          next: (res: boolean) => {
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
        this.userServices.DeleteSelectUser(this.selectedUsers).subscribe({
          next: (res: boolean) => {
            if (res) {
              this.alertMessage.success("The Users is Delete")
              this.selectedUsers = []
            }
          }, error: (err: any) => {
            this.alertMessage.error("Action Valid")
          }
        })
        this.getUserInfo()
      }
    })
  }

  hideDialog() {
    this.UserDialog = false;
    this.submitted = false;
  }

  filterTableData() {
    this.getUserInfo()
    let dataFiltered = this.usersDataInfo.filter((user: getUserInfoModel) => user.userId != this.userInfo?.userId)

    if (this.userInfo?.role == "Admin" || this.userInfo?.role == "Super-Admin") {
      if (this.selectedRole != undefined) {
        dataFiltered = this.usersDataInfo
        dataFiltered = dataFiltered.filter((user: any) => user.userId != this.userInfo.userId && user.role == this.selectedRole)
        this.usersDataInfo = dataFiltered

      }
      else if (this.selectedRole == undefined) {
        this.usersDataInfo = dataFiltered
      }

      if (this.selectedGroup != undefined) {
        console.log(this.selectedGroup)
        dataFiltered = dataFiltered.filter((users: any) => users.userId != this.userInfo?.userId && users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
        this.usersDataInfo = dataFiltered
      }
      else if (this.selectedGroup == undefined) {
        this.usersDataInfo = dataFiltered
      }
    }
    else {
      if (this.selectedGroup != undefined && this.checkInput) {
        let userFound = this.usersDataInfo.find((user: any) => user.userId == this.userInfo.userId)
        dataFiltered = dataFiltered.filter((user: any) =>
          user.userId != this.userInfo.userId && userFound.role == user.role &&
          user.groups.find((usersGroup: any) =>
            usersGroup == this.selectedGroup))
        this.usersDataInfo = dataFiltered

      }

      else if (this.selectedGroup == undefined && this.checkInput) {
        let userFound = this.usersDataInfo.find((user: any) => user.userId == this.userInfo?.userId)
        this.usersDataInfo = dataFiltered.filter((user: any) => user.userId != this.userInfo?.userId && userFound.role == user.role)
      }

      else if (!this.checkInput && this.selectedGroup != undefined) {
        this.usersDataInfo = dataFiltered.filter((users: any) => users.userId != this.userInfo?.userId && users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
      }

      else if (!this.checkInput && this.selectedGroup == undefined) {
        let userFound = this.usersDataInfo.find((user: any) => user.userId == this.userInfo?.userId)
        dataFiltered = dataFiltered.filter((users: any) => users.userId != this.userInfo?.userId && users.groups.find((group: any) => userFound.groups.includes(group)))
        this.usersDataInfo = dataFiltered
      }
    }
  }

  checkuserRole(userRole: any, superRole?: string) {
    return this.userInfo.role == userRole || this.userInfo.role == superRole;
  }

  checkSuperRole(usersInfo: any, userInfoRole: string, superRole: string) {

    return ((usersInfo.role == userInfoRole || usersInfo.role == superRole) && (this.userInfo?.role != superRole || usersInfo.role == superRole))
  }


  clearGroup() {
    this.selectedGroup = undefined;
    this.filterTableData()
  }

  clearRole() {
    this.selectedRole = undefined;
    this.filterTableData()
  }

  checkSelectedUsers(selectedUsers: any) {
    let usersSelect = selectedUsers?.map((check: any) => check.role)
    return usersSelect?.includes("Super-Admin") || (usersSelect?.includes("Admin") && this.userInfo.role != 'Super-Admin')
  }
}