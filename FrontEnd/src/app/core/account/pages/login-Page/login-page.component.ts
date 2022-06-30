import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageServices } from 'src/app/core/main/utility/services/alert/AlertMessage.Services';
import { LogInService } from './login-page.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  show: boolean = false
  email: string;
  password: string;
  userRole: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private alertMessage: AlertMessageServices,
    private LogInService: LogInService) {

  }

  ngOnInit(): void {
    console.log(localStorage.getItem(''));
    
    this.LogInService.bindData();
    this.loginFormFunction();
  }

  loginFormFunction() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required]
    })
  }

  logIn() {
    this.LogInService.logIn(this.email, this.password).subscribe({
      next: (res: any) => {
        if (res) {
          this.router.navigate(["main/home"])
          localStorage.setItem("userInfo", JSON.stringify(res))
        }
      },
      error: (err: any) => {
        this.alertMessage.Warning(err.error)
      }
    })
  }
}
