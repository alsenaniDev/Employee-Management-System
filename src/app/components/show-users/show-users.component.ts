import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  Users = JSON.parse(localStorage.getItem("Users") || "[]")
  Groups = JSON.parse(localStorage.getItem("Groups") || "[]")
  Roles = JSON.parse(localStorage.getItem("Roles") || "[]")
  usersList: any = [...this.Users]
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]

  constructor() { }

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

    this.usersList = this.Users.filter((u: any) => u.group == group);
  }

  getRoles() {
    let e = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = e.value;

    this.Users.filter((u: any) => console.log(u))
  }
}
