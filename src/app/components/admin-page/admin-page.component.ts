import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]")
  userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)


  constructor() { }

  ngOnInit(): void {

  }

  checkRole(name: string) {
    return this.userProfile.role == name;
  }
}
