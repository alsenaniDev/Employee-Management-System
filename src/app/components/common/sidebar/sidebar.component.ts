import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userProfile: any = [];

  constructor(private sidebarService: SidebarService) {

  }

  ngOnInit(): void {
    this.userProfile = this.sidebarService.userProfile
  }

  checkRole(userRole: string, superRole?: string) {
    return this.userProfile.role == userRole || this.userProfile.role == superRole;
  }

}
