import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userProfile: any
  userToken = (localStorage.getItem("token") || "null")
  Users = JSON.parse(localStorage.getItem("Users") || "[]")
  userFound = this.Users.find((user: any) => user.id == this.userToken)

  Groups = JSON.parse(localStorage.getItem("Groups") || "[]")
  findGroup = this.Groups.find((group: any) => group.id == this.userFound.group)
  constructor() {
    
  }

  ngOnInit(): void {
    document.getElementById("toggle-btn")?.addEventListener("click", () => {
      if (window.innerWidth >= 1200) {
        if (document.getElementById("sidebar")!.style.left == "-300px") {
          document.getElementById("sidebar")!.style.left = "0px";
          document.getElementById("main")!.style.marginLeft = "300px";
        } else {
          document.getElementById("sidebar")!.style.left = "-300px";
          document.getElementById("main")!.style.marginLeft = "0px";
        }
      } else {
        if (document.getElementById("sidebar")!.style.left == "-300px") {
          document.getElementById("sidebar")!.style.left = "0px";
        } else {
          document.getElementById("sidebar")!.style.left = "-300px";
        }
      }
    });
  }
}
