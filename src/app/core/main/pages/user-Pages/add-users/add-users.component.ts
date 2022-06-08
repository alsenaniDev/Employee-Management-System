import { Component, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUserServices } from './add-users.service';

declare var $: any;
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
      title: 'Email',
      controlName: 'email',
      type: "text"
    },
    {
      title: 'Password',
      controlName: 'password',
      type: "password"
    },
    {
      title: 'Phone Number',
      controlName: 'phoneNumber',
      type: "text"
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public usersServices: AddUserServices) {
  }

  ngOnInit(): void {
    this.usersServices.bindData();
    this.signUpFormFunction();
  }

  signUpFormFunction() {
    this.SignUpForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      groups: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    this.usersServices.addUser(this.SignUpForm);
    this.router.navigate(["/main/show-users"])
  }
}
