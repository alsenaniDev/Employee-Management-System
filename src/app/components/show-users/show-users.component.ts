import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements OnInit {
  Users = JSON.parse(localStorage.getItem("Users") || "[]")
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  userToken = (localStorage.getItem("token") || "null")

  usersList: any = [...this.Users]
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]

  userFound = this.Users.find((user: any) => user.id == this.userToken)
  userGroups = this.userFound.group.map((group: any) => group.id)
  findRole = this.Roles.find((role: any) => role.id == this.userFound.roles)
  myUsersGroupsAndRoles = this.Users.filter((user: any) => user.id != this.userFound.id
    && user.group.find((userGroup: any) => this.userGroups.includes(userGroup.id)
      || user.roles == this.userFound.roles));

  constructor() {
    if (this.findRole.name == "Admin") {
      this.usersList = [...this.Users]
      this.rolesList = [...this.Roles]
      this.groupsList = [...this.Groups]
    } else {
      this.usersList = [...this.myUsersGroupsAndRoles]
      this.groupsList = this.Groups.filter((group: any) => this.userGroups.includes(group.id))

    }
  }

  ngOnInit(): void {
  }

  deleteUser(id: any) {
    let i = this.usersList.findIndex((user: any) => user.id == id)
    this.usersList.splice(i, 1)
    localStorage.setItem("Users", JSON.stringify(this.usersList))
  }

  getGroup() {
    let e = (<HTMLInputElement>document.getElementById("ddlGroup"));
    let group = e.value;

    this.usersList = this.Users.filter((user: any) => user.id != this.userFound.id && user.group.find((g: any) => g.id == group))
  }

  getRoles() {
    let e = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = e.value;
    this.usersList = this.Users.filter((u: any) =>u.id != this.userFound.id && u.roles == role);
  }

  isAdmin() {
    return this.findRole.name == "Admin";
  }

  filterByRole() {
    const checkbox = document.getElementById(
      'checked',
    ) as HTMLInputElement | null;
    if (checkbox?.checked) {
      this.usersList = this.Users.filter((u: any) => u.id != this.userFound.id && u.roles == this.userFound.roles);
    } else {
      this.usersList = [...this.myUsersGroupsAndRoles]
    }
  }
}
