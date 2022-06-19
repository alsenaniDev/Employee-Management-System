import { Component, OnInit } from '@angular/core';
import { NavbarServices } from './navbarSevices';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userProfile: any


  constructor(private navbarServices: NavbarServices) {
  }

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem("userInfo") || "null")
    this.userProfile = data.data
  }

  clearData() {
    localStorage.setItem("userInfo", "")
  }
}
