import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from './Show-users-Dto';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements AfterViewInit {
  EditForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'role', 'groups', 'edit', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  elementsChecked: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<PeriodicElement>(true, []);

  hide: boolean;
  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))
  usersEmail = this.Users.map((user: any) => user.email)
  usersList: any = [...this.Users]
  userRole: any = {};
  userDataList: any = [];

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
      title: 'Phone Number',
      controlName: 'phoneNumber',
      type: "text"
    },
  ];



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }


  constructor(public formBuilder: FormBuilder ) {


    this.EditForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(3)]],
      lname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(`05[0-9]{8}$`)]],
      groups: ['', Validators.required],
      role: [this.userRole.name, Validators.required],
    });
  }



  ngOnInit(): void {
    if (this.userProfile.role == "Admin") {
      this.hide = false;
    } else {
      this.hide = true;
    }

    this.dataSource.data = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    } else {
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  filterTableData() {
    let dataFiltered = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
    let elemRole = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = ''
    if (elemRole != null) {
      role = elemRole.value;
    }

    let check = ((<HTMLInputElement>document.getElementById("checked")));
    let checkRole
    if (check != null) {
      checkRole = check.checked
    }
    let elemGroup = (<HTMLInputElement>document.getElementById("ddlGroup"));
    let group = '';
    if (elemGroup != null) {
      group = elemGroup.value;
    }

    if (this.userProfile.role == "Admin") {
      if (role != "0" && role != "") {
        dataFiltered = dataFiltered.filter((users: any) => users.role == role)
        this.dataSource.data = dataFiltered
      } else if (role == "0") {
        this.dataSource.data = dataFiltered
      }

      if (group != "" && group != "0") {
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup == group))
        this.dataSource.data = dataFiltered
      } else if (group == "0") {
        this.dataSource.data = dataFiltered
      }
    } else {
      if (group != "" && checkRole) {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((user: any) => userFound.role == user.role && user.groups.find((usersGroup: any) => usersGroup == group))

        this.dataSource.data = dataFiltered
      } else if (group == "" && checkRole) {
        // this.dataSource.data = dataFiltered.filter((user: any) =>  user.role == role)
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        this.dataSource.data = dataFiltered.filter((user: any) => userFound.role == user.role)
      } else if (!checkRole && group != "") {
        this.dataSource.data = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup == group))
      } else if (!checkRole && group == "") {
        let userFound = this.usersInfo.find((user: any) => user.userId == this.userProfile.userId)
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((group: any) => userFound.groups.includes(group)))
        this.dataSource.data = dataFiltered
      }
    }
  }

  deleteUser(id: any) {
    let index = this.usersInfo.findIndex((user: any) => user.userId == id)
    this.usersInfo.splice(index, 1)
    localStorage.setItem("usersInfoDB", JSON.stringify(this.usersInfo))

    let i = this.Users.findIndex((user: any) => user.userId == id)
    this.Users.splice(i, 1)
    localStorage.setItem("UsersDB", JSON.stringify(this.Users))
    this.dataSource.data = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
  }

  checkRole(name: string) {
    return this.userProfile.role == name;
  }



  onSubmit() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched()

    } else if (this.usersEmail.includes(this.EditForm.value.email)) {
      this.EditForm.invalid
    } else {
      let dateObj = new Date();
      let month = dateObj.getMonth() + 1;
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      let newdate = year + "-" + month + "-" + day;
      let user = {
        firstName: this.EditForm.value.fname,
        lastName: this.EditForm.value.lname,
        email: this.EditForm.value.email,
        password: this.EditForm.value.password,
        phoneNumber: this.EditForm.value.phoneNumber,
        CreatedBy: this.userProfile.userId,
        CreatedAt: newdate
      }
      this.usersList.push(user)
      localStorage.setItem("UsersDB", JSON.stringify(this.usersList))
      const userInfo = {
        role: this.EditForm.value.role,
        groups: this.EditForm.value.groups
      }
    }
  }

}

let ELEMENT_DATA: PeriodicElement[] = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
