import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { StatsCardComponent } from '../../../components/stats-card/stats-card.component';
import { ThemeChangeService } from '../../services/themeChange.service';
import { NavbarServices } from './navbarSevices';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userProfile: any
  isDarkTheme: boolean;
  themeChange: ThemeChangeService;
  constructor(private navbarServices: NavbarServices,
    private stats: StatsCardComponent,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem("theme") == "dark" ? true : false;
    let data = JSON.parse(localStorage.getItem("userInfo") || "null")
    this.userProfile = data.data
  }

  clearData() {
    localStorage.setItem("userInfo", "")
  }

  storeTheme() {
    this.isDarkTheme = !this.isDarkTheme
    if (this.isDarkTheme) {
      localStorage.setItem('theme', 'dark')
      this.isDarkTheme = true
      this.stats.BarColor = "#fff"
    } else {
      localStorage.setItem('theme', 'light')
      this.isDarkTheme = false
      this.stats.BarColor = "#000"
    }
    this.stats.refresh()
  }
}
