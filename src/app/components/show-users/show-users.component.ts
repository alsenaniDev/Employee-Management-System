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
    console.log(this.groupsList)
  }
  deleteUser(id: any) {
    let i = this.usersList.findIndex((user: any) => user.id == id)
    this.usersList.splice(i, 1)
    localStorage.setItem("Users", JSON.stringify(this.usersList))
  }

}
