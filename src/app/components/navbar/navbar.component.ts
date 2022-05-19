import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userProfile = JSON.parse(localStorage.getItem("profileDB") || "null")
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
