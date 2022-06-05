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
    this.userProfile = this.navbarServices.userProfile
  }

  ngOnInit(): void {
  }

  clearData() {
    localStorage.setItem("userInfo", "")
  }
}
