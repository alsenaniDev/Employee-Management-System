import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
  constructor() {

  }

  ngOnInit(): void {
    if (window.innerWidth >= 1200 && window.innerHeight <= 1600) {
      document.getElementById("sidebar")!.style.left = "0px";
      document.getElementById("main")!.style.marginLeft = "300px";
    } else {
      document.getElementById("sidebar")!.style.left = "-300px";
    }

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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 1200) {
      document.getElementById("sidebar")!.style.left = "0px";
      document.getElementById("main")!.style.marginLeft = "300px";
    } else {
      document.getElementById("sidebar")!.style.left = "-300px";
      document.getElementById("main")!.style.marginLeft = "0px";
    }

    if (document.getElementById("user-form") != null) {
      if (event.target.innerWidth <= 1600) {
        document.getElementById("user-form")!.classList.add("col-lg-12");
      } else {
        document.getElementById("user-form")!.classList.remove("col-lg-12");
      }
    }
  }
}
