import { Component, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript"
import { AddUserServices } from './add-users-services';

declare var $: any;
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

@Injectable({ providedIn: "root" })

export class AddUsersComponent {
  SignUpForm: FormGroup;
  Users: any
  groups: any
  roles: any
  usersEmail: any
  userProfile: any
  usersInfo: any

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

  constructor(public formBuilder: FormBuilder, private router: Router, private usersServices: AddUserServices) {
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

  ngOnInit(): void {
    this.bindData();
  }

  bindData() {
    this.Users = this.usersServices.Users
    this.usersEmail = this.Users.map((user: any) => user.email)
    this.groups = this.usersServices.groups
    this.roles = this.usersServices.roles
    this.userProfile = this.usersServices.userProfile
    this.usersInfo = this.usersServices.usersInfo
  }

  onSubmit() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    } else if (this.usersEmail.includes(this.SignUpForm.value.email)) {
      this.SignUpForm.invalid
    } else {
      let guid = Guid.create().toJSON();
      let userGuid = guid.value
      let dateObj = new Date();
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let newDate = year + "-" + month + "-" + day;

      let user = {
        userId: userGuid,
        firstName: this.SignUpForm.value.fname,
        lastName: this.SignUpForm.value.lname,
        email: this.SignUpForm.value.email,
        password: this.SignUpForm.value.password,
        phoneNumber: this.SignUpForm.value.phoneNumber,
        CreatedBy: this.userProfile.userId,
        CreatedAt: newDate
      }

      this.Users.push(user)
      localStorage.setItem("UsersDB", JSON.stringify(this.Users))

      const userInfo = {
        userId: userGuid,
        role: this.SignUpForm.value.role,
        groups: this.SignUpForm.value.groups
      }

      if (this.usersInfo != null) {
        this.usersInfo.push(userInfo)
        localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfo))
      } else {
        let newUser = [{
          userId: userGuid,
          role: this.SignUpForm.value.role,
          groups: this.SignUpForm.value.groups
        }]
        localStorage.setItem("usersInfoDB", JSON.stringify(newUser))
      }
      this.SignUpForm.reset()
      this.router.navigateByUrl("/dashboard/show")
    }
  }
}
