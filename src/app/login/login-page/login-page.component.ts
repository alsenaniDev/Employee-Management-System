import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
@Injectable({providedIn : "root"})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  userToken =(localStorage.getItem("token") || "null")
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  logIn() {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let users = JSON.parse(localStorage.getItem("Users") || "");
    let user = users.find((u: any) => u.email == email && u.password == password)
    if (user) {
      document.getElementById("alert")!.style.display = "none";
      this.router.navigate(['/dashboard/admin']);
      localStorage.setItem("token" , user.id )
    } else {
      document.getElementById("alert")!.style.display = "";
    }
  }
}
