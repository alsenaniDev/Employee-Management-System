import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

@Injectable({ providedIn: "root" })
export class AddUsersComponent {
  SignUpForm: FormGroup;
  controls = [
    {
      title: 'First Name',
      controlName: 'fname',
      type: "text"
    },
    {
      title: 'Last Name',
      controlName: 'lname',
      type: "text"
    },
    {
      title: 'User Name',
      controlName: 'username',
      type: "text"
    },
    {
      title: 'Salary',
      controlName: 'salary',
      type: "text"
    },
    {
      title: 'Password',
      controlName: 'password',
      type: "password"
    },
    {
      title: 'Re-Password',
      controlName: 're_password',
      type: "password"
    }
  ];

  constructor(public formBuilder: FormBuilder) {
    this.SignUpForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      salary: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      re_password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    console.log(this.SignUpForm.get('fname'));
  }

  updateData() {
    this.SignUpForm.patchValue({
      fname: "Mohammed",
      lname: "Alsenani",
      username: "Moha",
      salary: 15000,
      role: "Admin",
      password: 123,
      re_password: 123,
    });
  }
}
