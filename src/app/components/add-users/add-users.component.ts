import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(public formBuilder: FormBuilder , private router : Router) {
    this.SignUpForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      group: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }



  onSubmit() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    } else {
      let user = {
        id: new Date().getTime().toString(),
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
