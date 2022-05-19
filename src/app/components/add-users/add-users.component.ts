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
  groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  roles = JSON.parse(localStorage.getItem("RolesDB") || '[]')
  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("profileDB") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
  usersEmail = this.Users.map((user: any) => user.email)
  groupsList: any = [...this.groups]
  rolesList: any = [...this.roles]
  usersList: any = [...this.Users]
  usersInfoList : any = [...this.usersInfo]

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

  constructor(public formBuilder: FormBuilder, private router: Router) {
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
      let newdate = year + "-" + month + "-" + day;  
      let user = {
        userId: userGuid,
        firstName: this.SignUpForm.value.fname,
        lastName: this.SignUpForm.value.lname,
        email: this.SignUpForm.value.email,
        password: this.SignUpForm.value.password,
        phoneNumber: this.SignUpForm.value.phoneNumber,
        CreatedBy: this.userProfile.userId ,
        CreatedAt: newdate 
      }
      this.usersList.push(user)
      localStorage.setItem("UsersDB", JSON.stringify(this.usersList))
      const userInfo = {
        userId: userGuid,
        role: this.SignUpForm.value.role,
        groups: this.SignUpForm.value.groups
      }
      this.usersInfoList.push(userInfo)
      localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfoList))
      this.usersInfoList = this.usersInfo
      this.SignUpForm.reset()
      this.router.navigateByUrl("/dashboard/admin")


    }

  }





}
