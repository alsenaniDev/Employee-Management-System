import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript"
declare var $: any;
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

@Injectable({ providedIn: "root" })
export class AddUsersComponent {
  SignUpForm: FormGroup;
  groups = JSON.parse(localStorage.getItem("Groups") || "[]")
  roles = JSON.parse(localStorage.getItem("Roles") || '[]')
  Users = JSON.parse(localStorage.getItem("Users") || "[]")
  usersEmail = this.Users.map((user: any) => user.email)
  groupsList: any = [...this.groups]
  rolesList: any = [...this.roles]
  usersList: any = [...this.Users]

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
  ];

  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.SignUpForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      group: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }



  onSubmit() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()

    } else if (this.usersEmail.includes(this.SignUpForm.value.email)) {
      this.SignUpForm.invalid
    } else {
      let guid = Guid.create().toJSON();
      let user = {

        id: guid.value,
        firstName: this.SignUpForm.value.fname,
        lastName: this.SignUpForm.value.lname,
        email: this.SignUpForm.value.email,
        password: this.SignUpForm.value.password,
        group: this.SignUpForm.value.group,
        roles: this.SignUpForm.value.roles
      }
      this.usersList.push(user)
      localStorage.setItem("Users", JSON.stringify(this.usersList))
      this.SignUpForm.reset()
      this.router.navigateByUrl("/dashboard/admin")


    }

  }





}
