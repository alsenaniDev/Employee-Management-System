import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users = JSON.parse(localStorage.getItem("Users") || "[]")
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
