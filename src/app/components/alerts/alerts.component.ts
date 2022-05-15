import { Component, Input, OnInit } from '@angular/core';
import { AddUsersComponent } from '../add-users/add-users.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnInit {
  @Input() title?: string
  @Input() controlName?: string
  signupForm: any
  constructor(private form: AddUsersComponent) {
    this.signupForm = form.SignUpForm
  }

  ngOnInit(): void {
  }

}
