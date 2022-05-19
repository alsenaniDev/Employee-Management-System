import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements OnInit {
  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("profileDB") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))

  usersList: any = []
  usersDetailedInformation : any = []
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]



  constructor() {
    if (this.userProfile.role == "Admin") {
      this.usersList = [...this.usersInfo]
      this.rolesList = [...this.Roles]
      this.groupsList = [...this.Groups]
    } else {
      this.usersList = [...this.usersInfo]


    }
  }

  ngOnInit(): void {
    console.log(this.checkRole("Admin"))
 
  }

  deleteUser(id: any) {
    let i = this.usersList.findIndex((user: any) => user.id == id)
    this.usersList.splice(i, 1)
    localStorage.setItem("Users", JSON.stringify(this.usersList))
  }

  getGroup() {
    let e = (<HTMLInputElement>document.getElementById("ddlGroup"));
    let group = e.value;

 
  }

  getRoles() {
    let e = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = e.value;

  }

  checkRole(name : string) {
    return this.userProfile.role == name;
    
  }

  filterByRole() {
    const checkbox = document.getElementById(
      'checked',
    ) as HTMLInputElement | null;
    if (checkbox?.checked) {
      // this.usersList = this.Users.filter((u: any) => u.id != this.userFound.id && u.roles == this.userFound.roles);
    } else {
      // this.usersList = [...this.myUsersGroupsAndRoles]
    }
  }
}
