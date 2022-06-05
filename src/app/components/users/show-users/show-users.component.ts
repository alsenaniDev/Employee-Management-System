import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
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
  Groups: getGroupModel[

  ]
  Roles: getRoleModel[]
  userProfile: any
  usersInfo: any
  Users: User[]
  User: User;
  userGroups: any[]
  selectedUsers: User[]
  selectedRole: any
  selectedGroup: any
  UserDialog!: boolean;
  submitted!: boolean;
  check!: any
  findUser: getUserModel;
  findRole: getRoleModel
  findGroups: any
  GroupSelect: any

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userServices: ShowUserServices,
    private fb: FormBuilder,

  ) {

  }

  ngOnInit() {
    this.UsersData = this.userServices.UsersData
    this.Groups = this.userServices.Groups
    this.Roles = this.userServices.Roles
    this.userProfile = this.userServices.userProfile
    this.usersInfo = this.userServices.usersInfo
    this.Users = this.usersInfo
    this.userGroups = [...this.Groups]
    this.Users = this.usersInfo.filter((user: User) => user.userId != this.userProfile.userId)
    if (this.userProfile.role != "Admin") {
      this.userGroups = this.Groups.filter((group: any) => this.userProfile.groups.includes(group.name))
    } else {
      this.userGroups = this.Groups
    }
    this.Init_UpdateUserInfoForm();
  }


  Init_UpdateUserInfoForm(userInfo?: getUserModel, userRole?: getRoleModel, userGroups?: getGroupModel) {
    this.EditForm = this.fb.group({

      fname: [userInfo?.firstName, [Validators.required, Validators.minLength(3)]],
      lname: [userInfo?.lastName, [Validators.required, Validators.minLength(3)]],
      email: [userInfo?.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phoneNumber: [userInfo?.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      password: [userInfo?.password, [Validators.required, Validators.minLength(6)]],
      role: [userRole?.name, Validators.required],
      groups: [userGroups?.name, Validators.required],
    })
    console.log(userRole?.name);
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
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched()
    } else {
      let userIndex = this.UsersData.findIndex((user: getUserModel) => user.userId == this.findUser?.userId)
      let userInfoIndex = this.usersInfo.findIndex((user: User) => user.userId == this.findUser?.userId)
      let findUserRole = this.Roles.find((role: getRoleModel) => role.name == this.EditForm.value.role)
      let findGroupsIds = this.EditForm.value.groups.map((ids: any) => ids.id)
      if (this.userProfile.role == "Admin") {
        this.UsersData[userIndex] = Object.assign({}, this.UsersData[userIndex], {
          firstName: this.EditForm.value.fname,
          lastName: this.EditForm.value.lname,
          email: this.EditForm.value.email,
          phoneNumber: this.EditForm.value.phoneNumber,
          password: this.EditForm.value.password
        })
        localStorage.setItem("UsersDB", JSON.stringify(this.UsersData))
        this.usersInfo[userInfoIndex] = Object.assign({}, this.usersInfo[userInfoIndex], { role: findUserRole.id, groups: findGroupsIds })
        localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfo))
        this.Users = this.usersInfo
        this.UserDialog = false;

      }
    }
  }


  deleteSelectedUsers() {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Users = this.Users.filter(val => !this.selectedUsers.includes(val));
        localStorage.setItem("usersInfoDB", JSON.stringify(this.Users))
        this.UsersData = this.UsersData.filter((cv: any) => {
          return !this.selectedUsers.find(function (e) {
            return e.userId == cv.userId;
          });
        });
        localStorage.setItem("UsersDB", JSON.stringify(this.UsersData))
        this.selectedUsers = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      }
    });
  }

  editUser(userId: any) {
    // this.User = { ...User };
    this.UserDialog = true;
    this.findUser = this.UsersData.find((user: getUserModel) => user.userId == userId);
    let userInformation = this.usersInfo.find((user: User) => user.userId == this.findUser.userId);
    this.findRole = this.Roles.find((role: getRoleModel) => role.id == userInformation.role)
    this.findGroups = this.Groups.filter((group: getGroupModel) => userInformation.groups.includes(group.id))
    this.GroupSelect = this.findGroups
    console.log(this.findRole);

    this.Init_UpdateUserInfoForm(this.findUser, this.findRole, this.GroupSelect)

  }

  deleteUser(userId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete This User ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let userInfoIndex = this.usersInfo.findIndex((user: any) => user.userId == userId)
        this.usersInfo.splice(userInfoIndex, 1)
        localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfo))
        let userIndex = this.UsersData.findIndex((user: any) => user.userId == userId)
        this.UsersData.splice(userIndex, 1)
        localStorage.setItem("UsersDB", JSON.stringify(this.UsersData))
        this.Users = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.UserDialog = false;
    this.submitted = false;
  }

  filterTableData() {
    this.Users = this.usersInfo
    let dataFiltered = this.Users;

    let check = ((<HTMLInputElement>document.getElementById("checked")));
    let checkRole
    if (check != null) {
      checkRole = check.checked
    }

    if (this.userProfile.role == "Admin") {
      if (this.selectedRole != undefined) {
        console.log(this.Users);
        dataFiltered = dataFiltered.filter((user: any) => user.userId != this.userProfile.userId && user.role == this.selectedRole)
        this.Users = dataFiltered
      } else if (this.selectedRole == undefined) {
        this.Users = dataFiltered
      }

      if (this.selectedGroup != undefined) {
        console.log(this.selectedGroup)
        console.log(this.Users);
        dataFiltered = dataFiltered.filter((users: any) => users.userId != this.userProfile.userId && users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
        this.Users = dataFiltered
      } else if (this.selectedGroup == undefined) {
        this.Users = dataFiltered
      }
    } else {
      if (this.selectedGroup != undefined && checkRole) {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((user: any) => user.userId != this.userProfile.userId && userFound.role == user.role && user.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
        this.Users = dataFiltered
      } else if (this.selectedGroup == undefined && checkRole) {
        // this.Users = dataFiltered.filter((user: any) => user.role == this.selectedRole)
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        this.Users = dataFiltered.filter((user: any) => user.userId != this.userProfile.userId && userFound.role == user.role)
      } else if (!checkRole && this.selectedGroup != undefined) {
        this.Users = dataFiltered.filter((users: any) => users.userId != this.userProfile.userId && users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
      } else if (!checkRole && this.selectedGroup == undefined) {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((users: any) => users.userId != this.userProfile.userId && users.groups.find((group: any) => userFound.groups.includes(group)))
        this.Users = dataFiltered
      }
    }
  }

  checkuserRole(name: string) {
    return this.userProfile.role == name;
  }

  clearGroup() {
    this.selectedGroup = undefined;
    this.filterTableData()
  }

  clearRole() {
    this.selectedRole = undefined;
    this.filterTableData()
  }
}

