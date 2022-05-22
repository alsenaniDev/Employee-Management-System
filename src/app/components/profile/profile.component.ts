import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null");
  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]");
  userInfo = this.Users.find((user: any) => user.userId == this.userProfile.userId);
  editForm: FormGroup
  defaultValue: any

  constructor(private fb: FormBuilder) {
    this.Init_UpdateUserInfoForm(this.userInfo)
  }

  ngOnInit(): void {

  }

  Init_UpdateUserInfoForm(userInfo: any) {
    this.editForm = this.fb.group({
      firstName: [userInfo.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [userInfo.lastName, [Validators.required, Validators.minLength(3)]],
      passWord: [userInfo.password, [Validators.required, Validators.minLength(6)]],
      phoneNumber: [userInfo.phoneNumber, [Validators.required, Validators.pattern(`05[0-9]{8}$`)]]
    })
  }
  onSubmit() {

  }

}
