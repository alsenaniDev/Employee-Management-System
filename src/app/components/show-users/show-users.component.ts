// import { Component, Injectable, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-show-users',
//   templateUrl: './show-users.component.html',
//   styleUrls: ['./show-users.component.css']
// })

// export class ShowUsersComponent implements OnInit {
//   Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
//   Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
//   Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
//   userProfile = JSON.parse(localStorage.getItem("profileDB") || "null")
//   usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))

//   usersList: any = []
//   usersDetailedInformation: any = []
//   groupsList: any = [...this.Groups]
//   rolesList: any = [...this.Roles]



//   constructor() {
//     if (this.userProfile.role == "Admin") {
//       this.usersList = [...this.usersInfo]
//       this.rolesList = [...this.Roles]
//       this.groupsList = [...this.Groups]
//     } else {
//       this.usersList = [...this.usersInfo]
//     }
//   }

//   ngOnInit(): void {
//     console.log(this.checkRole("Admin"))
//   }

//   deleteUser(id: any) {
//     let i = this.usersList.findIndex((user: any) => user.id == id)
//     this.usersList.splice(i, 1)
//     localStorage.setItem("UsersDB", JSON.stringify(this.usersList))
//   }

//   getGroup() {
//     let e = (<HTMLInputElement>document.getElementById("ddlGroup"));
//     let group = e.value;
//   }

//   getRoles() {
//     let e = (<HTMLInputElement>document.getElementById("ddlRoles"));
//     let role = e.value;
//   }

//   checkRole(name: string) {
//     return this.userProfile.role == name;
//   }

//   filterByRole() {
//     const checkbox = document.getElementById(
//       'checked',
//     ) as HTMLInputElement | null;
//     if (checkbox?.checked) {
//       // this.usersList = this.Users.filter((u: any) => u.id != this.userProfile.id && u.roles == this.userProfile.roles);
//     } else {
//       // this.usersList = [...this.myUsersGroupsAndRoles]
//     }
//   }
// }

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})

export class ShowUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phoneNumber', 'role', 'groups', 'edit', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selection = new SelectionModel<PeriodicElement>(true, []);

  Users = JSON.parse(localStorage.getItem("UsersDB") || "[]")
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  userProfile = JSON.parse(localStorage.getItem("userInfo") || "null")
  usersInfo = JSON.parse(localStorage.getItem("usersInfoDB" || "[]"))

  usersList: any = [...this.Users]
  usersDetailedInformation: any = []
  groupsList: any = [...this.Groups]
  rolesList: any = [...this.Roles]

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (document.getElementById("UserRole") != null) {
      (<HTMLInputElement>(document.getElementById("UserRole"))).value = this.userProfile.role
    }
  }

  constructor() {
    this.getDataSource();
    if (this.userProfile.role == "Admin") {
      this.dataSource.data = JSON.parse(localStorage.getItem("tempTable") || "[]");
      this.rolesList = [...this.Roles]
      this.groupsList = [...this.Groups]
    } else {
      let dataFiltered = JSON.parse(localStorage.getItem("tempTable") || "[]");
      dataFiltered = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role)
      this.dataSource.data = dataFiltered
    }
  }

  showMsg(id: any) {
    console.log(id);
  }

  ngOnInit(): void {
  }

  deleteUser(id: any) {
    let i = this.dataSource.data.findIndex((user: any) => user.id == id)
    this.dataSource.data.splice(i, 1)
    localStorage.setItem("UsersDB", JSON.stringify(this.dataSource.data))
    this.dataSource.data = JSON.parse(localStorage.getItem("UsersDB") || "[]");
  }

  checkRole(name: string) {
    return this.userProfile.role == name;
  }

  filterTableData() {
    let dataFiltered = JSON.parse(localStorage.getItem("tempTable") || "[]");
    let elemRole = (<HTMLInputElement>document.getElementById("ddlRoles"));
    let role = '';
    if (elemRole != null) {
      role = elemRole.value;
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
      if (group != "" && group != "0") {
        dataFiltered = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role && users.groups.find((usersGroup: any) => usersGroup.id == group))
        this.dataSource.data = dataFiltered
      } else if (group == "0") {
        this.dataSource.data = dataFiltered.filter((users: any) => users.role.name == this.userProfile.role)
      }
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
