import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AddUsersComponent } from '../add-users/add-users.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnInit {
  @Input() title?: string
  @Input() controlName?: string
  @Input() formName?: any
  constructor() {
  }

  ngOnInit(): void {
  }

}
// ElementRef
// ViewContainerRef