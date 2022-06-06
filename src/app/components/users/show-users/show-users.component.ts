import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AlertMessageServices } from '../../AlertMessage.Services';
import { popupAlertMessage } from '../../popupAlert.services';
import { getUserInfoModel } from '../../profile/profile.dto';
import { getGroupModel, getRoleModel, getUserModel } from './Show-users-Dto';
import { ShowUserServices } from './show-users-services';
import { User } from './UserDto';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent {
  EditForm: FormGroup;
  UsersData: getUserModel[];
  Groups: getGroupModel[]
  Roles: getRoleModel[]
  selectedUsers: User[]
  selectedRole: any
  selectedGroup: any
  UserDialog!: boolean;
  submitted!: boolean;
  checkInput: boolean = false;
  GroupSelect: any
  usersDataInfo: getUserInfoModel[]
  userInfo: any
  userDetails: getUserInfoModel
  usersGroups: getGroupModel[]

  constructor(
    private messageService: MessageService,
    private userServices: ShowUserServices,
    private fb: FormBuilder,
    private popupServices: popupAlertMessage,
    private alertMessage: AlertMessageServices

  ) {

  }



  ngOnInit() {

    this.Init_UpdateUserInfoForm();
    this.getUserInfo()
    this.userInformation()
    this.getGroups()
    this.getRoles()

    this.usersDataInfo = this.usersDataInfo.filter((user: getUserInfoModel) => user.userId != this.userInfo?.userId)
    if (this.userInfo?.role !== "Admin" && this.userInfo?.role !== "Super-Admin") {
      this.Groups = this.Groups.filter((group: getGroupModel) => this.userInfo.groups.includes(group.name))
    }
    console.log(this.userInfo);
  }



  getUserInfo() {
    this.userInformation()
    this.userServices.usersInfoData().subscribe({
      next: (res: getUserInfoModel[]) => {
        this.usersDataInfo = res
      }, error: (err: any) => {
        return err;
      }
    })
  }

  userInformation() {
    let userInfoData = JSON.parse(localStorage.getItem("userInfo") || "")
    this.userServices.getUserInfoById(userInfoData.userId).subscribe({
      next: (res: getUserInfoModel) => {
        this.userInfo = res
        console.log(res)
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
    this.EditForm = this.fb.group({
      fname: [userDetails?.firstName, [Validators.required, Validators.minLength(3)]],
      lname: [userDetails?.lastName, [Validators.required, Validators.minLength(3)]],
      email: [userDetails?.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phoneNumber: [userDetails?.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      password: [userDetails?.password, [Validators.required, Validators.minLength(6)]],
      role: [userDetails?.role, Validators.required],
      groups: [userDetails?.groups, Validators.required],
    })
    console.log(userDetails?.groups);
    console.log(this.EditForm.value.role);

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
    },

  ];

  onsubmit() {
    this.userServices.EditUser(this.userDetails, this.EditForm)
    this.getUserInfo()
    this.UserDialog = false;
  }


  deleteSelectedUsers() {
    var deleteUser = () => {
      this.userServices.DeleteSelectUser(this.selectedUsers)
      this.selectedUsers = [];
      this.getUserInfo()
    }
    this.popupServices.servicesAlert({
      header: "Confirm",
      message: 'Are you sure you want to delete This Users ?',
      opertions: deleteUser
    })
  }

  editUser(userId: any) {
    this.UserDialog = true;
    var userGroups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
    this.userServices.getUserInfoById(userId).subscribe({
      next: (res: getUserInfoModel) => {
        this.userDetails = res
        this.GroupSelect = userGroups.filter((group: any) =>
          res.groups.includes(group.name))
        this.Init_UpdateUserInfoForm(this.userDetails)
        console.log(this.GroupSelect)
        console.log(res)
      },
      error: (err: any) => {
        return err;

      }
    })
    this.userInformation()
  }

  deleteUser(userId: any) {
    var deleteUser = () => {
      this.userServices.DeleteUser(userId);
      this.getUserInfo()
    }
    this.popupServices.servicesAlert({
      header: "Confirm",
      message: 'Are you sure you want to delete This User ?',
      opertions: deleteUser
    })

  }

  hideDialog() {
    this.UserDialog = false;
    this.submitted = false;
  }

  filterTableData() {
    this.getUserInfo()
    let dataFiltered = this.usersDataInfo.filter((user: getUserInfoModel) => user.userId != this.userInfo?.userId)

    if (this.userInfo?.role == "Admin") {
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

    return ((usersInfo.role == userInfoRole || usersInfo.role == superRole) && (this.userInfo?.role != 'Super-Admin' || usersInfo.role == superRole))
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