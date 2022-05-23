import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  usersDetailedInformation: any = []
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]

  userRole: any = {};
  userGroups: any = [];

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
    if (document.getElementById("UserRole") != null) {
      (<HTMLInputElement>(document.getElementById("UserRole"))).value = this.userProfile.role
    }
  }

  constructor(public formBuilder: FormBuilder) {
    this.getDataSource();
    if (this.userProfile.role == "Admin") {
      this.dataSource.data = JSON.parse(localStorage.getItem("tempTable") || "[]");
      this.rolesList = [...this.Roles]
      this.groupsList = [...this.Groups]
    } else {
      let dataFiltered = JSON.parse(localStorage.getItem("tempTable") || "[]");
      dataFiltered = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role || users.groups.find((g: any) => this.userProfile.groups.includes(g.name)))

      this.dataSource.data = dataFiltered
    }

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

  showMsg(id: any) {
    console.log(id);
  }

  ngOnInit(): void {
    if (this.userProfile.role == "Admin") {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }

  deleteUser(id: any) {
    let i = this.dataSource.data.findIndex((user: any) => user.id == id)
    this.dataSource.data.splice(i, 1)
    localStorage.setItem("UsersDB", JSON.stringify(this.dataSource.data))
    this.dataSource.data = JSON.parse(localStorage.getItem("UsersDB") || "[]");
  }

  filterTableData() {
    let dataFiltered = JSON.parse(localStorage.getItem("tempTable") || "[]");

    let elemRole = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = '';
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
        dataFiltered = dataFiltered.filter((users: any) => users.role.id == role)
        this.dataSource.data = dataFiltered
      } else if (role == "0") {
        this.dataSource.data = dataFiltered
      }

      if (group != "" && group != "0") {
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup.id == group))
        this.dataSource.data = dataFiltered
      } else if (group == "0") {
        this.dataSource.data = dataFiltered
      }
    } else {
      if (group != "" && checkRole) {
        dataFiltered = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role && users.groups.find((usersGroup: any) => usersGroup.id == group))
        this.dataSource.data = dataFiltered
      } else if (group == "" && checkRole) {
        this.dataSource.data = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role)
      } else if (!checkRole && group != "") {
        this.dataSource.data = dataFiltered.filter((users: any) => users.groups.find((usersGroup: any) => usersGroup.id == group))
      } else if (!checkRole && group == "") {
        dataFiltered = dataFiltered.filter((users: any) => users.groups.find((g: any) => this.userProfile.groups.includes(g.name)))
        this.dataSource.data = dataFiltered
      }
    }
  }

  checkRole(name: string) {
    return this.userProfile.role == name;
  }

  gitCheck(id: any) {
    let element = (<HTMLInputElement>document.getElementById(id))
    let isChecked = element.getAttribute("ng-reflect-checked")
    let elementId = element.getAttribute("id")

    if (isChecked == "false") {
      this.elementsChecked.push(elementId)
    } else if (isChecked == "true") {
      this.elementsChecked = this.elementsChecked.filter((elem: any) => elem != elementId)
    }

    if (this.elementsChecked.length > 0) {
      document.getElementById("delete").removeAttribute("disabled");
      document.getElementById("send").removeAttribute("disabled");
    } else {
      document.getElementById("delete").setAttribute("disabled", "disabled");
      document.getElementById("send").setAttribute("disabled", "disabled");
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      document.getElementById("delete").setAttribute("disabled", "disabled");
      document.getElementById("send").setAttribute("disabled", "disabled");
      this.selection.clear();
      return;
    } else {
      document.getElementById("delete").removeAttribute("disabled");
      document.getElementById("send").removeAttribute("disabled");
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getDataSource() {
    let dataSource = [{}];
    let usersInfo = JSON.parse(localStorage.getItem("usersInfoDB") || "[]");
    let usersData = JSON.parse(localStorage.getItem("UsersDB") || "[]");
    let usersRole = JSON.parse(localStorage.getItem("RolesDB") || "[]");
    let usersGroups = JSON.parse(localStorage.getItem("GroupsDB") || "[]");


    usersInfo.forEach((data: any) => {
      let userD = usersData.find((d: any) => d.userId == data.userId);
      let userR = usersRole.find((r: any) => r.id == data.role);
      let userG = usersGroups.filter((g: any) => data.groups.includes(g.id));

      let userData = {
        id: userD.userId,
        email: userD.email,
        firstName: userD.firstName,
        lastName: userD.lastName,
        phoneNumber: userD.phoneNumber,
        userId: userD.userId,
        role: userR,
        groups: userG
      }
      dataSource.push(userData);
    })
    dataSource.shift()

    dataSource = dataSource.filter((users: any) => users.userId != this.userProfile.userId)
    localStorage.setItem("tempTable", JSON.stringify(dataSource))
  }

  getUserData(id: any) {
    this.userDataList = []
    let usersData = JSON.parse(localStorage.getItem("tempTable") || "[]");
    let user = usersData.find((user: any) => user.userId == id);

    this.userDataList.push(user.firstName);
    this.userDataList.push(user.lastName);
    this.userDataList.push(user.email);
    this.userDataList.push(user.phoneNumber);

    this.userRole = user.role;
    this.userGroups = user.groups;
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

export interface PeriodicElement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userId: string;
  role: string,
  groups: string;
}

let ELEMENT_DATA: PeriodicElement[] = JSON.parse(localStorage.getItem("tempTable") || "[]");
