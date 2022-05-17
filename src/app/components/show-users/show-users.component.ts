import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements OnInit {
  Users = JSON.parse(localStorage.getItem("Users") || "[]")
  Groups = JSON.parse(localStorage.getItem("Groups") || "[]")
  Roles = JSON.parse(localStorage.getItem("Roles") || "[]")
  userToken = (localStorage.getItem("token") || "null")
  usersList: any = [...this.Users]
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]
  userFound = this.Users.find((user: any) => user.id == this.userToken)
  userRoles = this.userFound.roles.map((role: any) => role.id)
  findGroup = this.Groups.find((group: any) => group.id == this.userFound.group)
  myUsersGroupsAndRoles = this.Users.filter((user: any) => user.id != this.userFound.id && user.roles.find((userRole: any) => this.userRoles.includes(userRole.id) || user.group == this.userFound.group));

  constructor() {
    if (this.findGroup.name == "Admin") {
      this.usersList = [...this.Users]
      this.rolesList = [...this.Roles]
      this.groupsList = [...this.Groups]
    } else {
      this.usersList = [...this.myUsersGroupsAndRoles]
      this.rolesList = this.Roles.filter((role: any) => this.userRoles.includes(role.id))

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

    this.usersList = this.Users.filter((u: any) =>u.id != this.userFound.id && u.group == group);
  }

  getRoles() {
    let e = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = e.value;
    this.usersList = this.Users.filter((user: any) => user.id != this.userFound.id && user.roles.find((r: any) => r.id == role))
  }

  isAdmin() {
    return this.findGroup.name == "Admin";
  }

  filterByGroup() {
    const checkbox = document.getElementById(
      'checked',
    ) as HTMLInputElement | null;
    if (checkbox?.checked) {
      this.usersList = this.Users.filter((u: any) => u.id != this.userFound.id && u.group == this.userFound.group);
    } else {
      this.usersList = [...this.myUsersGroupsAndRoles]
    }
  }
}
