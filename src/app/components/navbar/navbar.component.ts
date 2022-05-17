import { Component, OnInit } from '@angular/core';
import { LoginPageComponent } from 'src/app/login/login-page/login-page.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
userProfile : any
  constructor(private user : LoginPageComponent ) {

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
