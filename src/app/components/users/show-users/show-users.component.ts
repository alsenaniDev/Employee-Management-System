import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from './UserDto';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent {
  EditForm: FormGroup;
  UsersData = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))


  // controls = [
  //   {
  //     title: 'First Name',
  //     controlName: 'fname',
  //     type: "text"
  //   },
  //   {
  //     title: 'Last Name',
  //     controlName: 'lname',
  //     type: "text"
  //   },

  //   {
  //     title: 'Email',
  //     controlName: 'email',
  //     type: "text"
  //   },
  //   {
  //     title: 'Phone Number',
  //     controlName: 'phoneNumber',
  //     type: "text"
  //   },
  // ];

  UserDialog!: boolean;
  Users: User[] = this.usersInfo;
  User: User;
  userGroups = [...this.Groups]
  selectedUsers: User[]
  selectedRole: any
  selectedGroup: any
  submitted!: boolean;


  check!: any

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) {

    console.log(this.Users)
    console.log(this.UsersData)
  }

  ngOnInit() {
    if (this.userProfile.role != "Admin") {
      this.userGroups = this.Groups.filter((group: any) => this.userProfile.groups.includes(group.name))
      console.log(this.Groups)
    } else {
      this.userGroups = this.Groups
    }
  }



  // openNew() {
  //   this.User = {};
  //   this.submitted = false;
  //   this.UserDialog = true;
  // }

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

  // editUser(userId: any) {
  //   this.User = { ...User };
  //   this.UserDialog = true;
  // }

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
        dataFiltered = dataFiltered.filter((user: any) => user.role == this.selectedRole)
        this.Users = dataFiltered
      } else if (this.selectedRole == undefined) {
        this.Users = dataFiltered
      }

      if (this.selectedGroup != undefined) {
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
        this.Users = dataFiltered
      } else if (this.selectedGroup == undefined) {
        this.Users = dataFiltered
      }
    } else {
      if (this.selectedGroup != undefined && checkRole) {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((user: any) => userFound.role == user.role && user.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
        this.Users = dataFiltered
      } else if (this.selectedGroup == undefined && checkRole) {
        // this.Users = dataFiltered.filter((user: any) => user.role == this.selectedRole)
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        this.Users = dataFiltered.filter((user: any) => userFound.role == user.role)
      } else if (!checkRole && this.selectedGroup != undefined) {
        this.Users = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup == this.selectedGroup))
      } else if (!checkRole && this.selectedGroup == undefined) {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((group: any) => userFound.groups.includes(group)))
        this.Users = dataFiltered
      }
    }
  }

  getValue(id: any) {
    console.log(id);
  }
  checkuserRole(name: string) {
    return this.userProfile.role == name;
  }

}

