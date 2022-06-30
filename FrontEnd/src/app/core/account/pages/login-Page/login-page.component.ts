import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageServices } from 'src/app/core/main/utility/services/alert/AlertMessage.Services';
import { ServiceRoles } from 'src/app/core/main/utility/services/common/serviceRoles.service';
import { Permission } from 'src/app/core/utility/permission';
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
    private LogInService: LogInService,
    private serviceRoles: ServiceRoles) {

  }

  ngOnInit(): void {

    this.LogInService.bindData();
    this.loginFormFunction();
    // this.getServiceRoles()
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
          this.getServiceRoles()
        }
      },
      error: (err: any) => {
        this.alertMessage.Warning(err.error)
      }
    })
  }

  getServiceRoles() {
    this.serviceRoles.getServiceRoles().subscribe({
      next: (res) => {
        localStorage.setItem("serviceRoles", JSON.stringify(res))
      }, error(err) {
        console.log(err);
      },
    })
  }

}
