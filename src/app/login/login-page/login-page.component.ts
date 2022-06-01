import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from './login-page.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  userToken: any = []
  usersInfo: any = []
  Roles: any = []
  Groups: any = []
  groupsId: any = []
  user: any
  userFound: any
  roleFound: any
  groupFound: any

  constructor(private fb: FormBuilder, private router: Router, private LogInService: LogInService) {
    this.userToken = this.LogInService.userToken
    this.usersInfo = this.LogInService.usersInfo
    this.Roles = this.LogInService.Roles
    this.Groups = this.LogInService.Groups
    this.groupsId = this.LogInService.groupsId
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  logIn() {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let users = JSON.parse(localStorage.getItem("UsersDB") || "");
    this.user = users.find((u: any) => u.email == email && u.password == password)

    if (this.user) {
      document.getElementById("alert")!.style.display = "none";
      this.userFound = this.usersInfo.find((u: any) => u.userId == this.user.userId)
      this.roleFound = this.Roles.find((r: any) => r.id == this.userFound.role)
      this.groupFound = this.Groups.filter((group: any) => this.userFound.groups.includes(group.id))
      let myGroupsName = this.groupFound.map((group: any) => group.name)
      let userInformation = {
        userId: this.user.userId,
        name: this.user.firstName + " " + this.user.lastName,
        role: this.roleFound.name,
        groups: myGroupsName
      }
      localStorage.setItem("userInfo", JSON.stringify(userInformation))
      window.location.href = '/dashboard/admin'
    } else {
      document.getElementById("alert")!.style.display = "";
    }
  }
}
