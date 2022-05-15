import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

@Injectable({ providedIn: "root" })
export class AddUsersComponent {
  SignUpForm: FormGroup;
  categories = [
    { id: 1, name: 'Laravel' },
    { id: 2, name: 'Codeigniter' },
    { id: 3, name: 'React' },
    { id: 4, name: 'PHP' },
    { id: 5, name: 'Angular' },
    { id: 6, name: 'Vue' },
    { id: 7, name: 'JQuery', disabled: true },
    { id: 8, name: 'Javascript' },
  ];
  selectedCityIds: string[]
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

  constructor(public formBuilder: FormBuilder) {
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

  items = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Node Js' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'PHP' },
    { id: 5, name: 'Django' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'ReactJs' },
  ];

  getValues() {

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
      console.log(user)
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
