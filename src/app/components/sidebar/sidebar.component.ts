import { Component, OnInit } from '@angular/core';
import { ShowUsersComponent } from '../show-users/show-users.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")

  constructor() { 

  }

  ngOnInit(): void {
  }
  checkRole(name: string) {
    return this.userProfile.role == name;
  }

}
