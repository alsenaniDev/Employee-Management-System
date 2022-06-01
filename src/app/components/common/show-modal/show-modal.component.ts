import { Component, Input, OnInit } from '@angular/core';
import { getGroupModel, getRoleModel } from '../../users/show-users/Show-users-Dto';
import { ShowUserServices } from '../../users/show-users/show-users-services';
import { ShowModalServices } from './show-modal-services';
import { ShowUserModalDTO } from './Show-User-Dto';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.css']
})
export class ShowModalComponent implements OnInit {
  userFound: ShowUserModalDTO
  Groups: getGroupModel[]
  Roles: getRoleModel[]
  data: any = [];
  isEdit: boolean = false;
  elementId: string = "";
  dataName: string = "";

  constructor(private userModal: ShowModalServices) {

  }

  ngOnInit(): void {
    this.userFound = this.userModal.userFound
    this.Groups = this.userModal.Groups
    this.Roles = this.userModal.Roles
  }
  AddData() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if ((<HTMLInputElement>document.getElementById("inputValue")).value != "") {
      if (this.isEdit === false) {
        let name = document.getElementById("model-title")!.innerHTML;
        let dataName = name.split(" ");

        if (dataName[0] == "Groups") {
          let groups = JSON.parse(localStorage.getItem("GroupsDB") || 'null');

          if (groups == null || groups.length <= 0) {

            let newGroups = [{
              id: 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
              createBy: this.userFound.userId,
              createAt: date
            }];
            localStorage.setItem("GroupsDB", JSON.stringify(newGroups));
          } else {
            let groups = JSON.parse(localStorage.getItem("GroupsDB") || '');
            let lastItem = groups[groups.length - 1];
            let newItem = {
              id: lastItem.id + 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
              createBy: this.userFound.userId,
              createAt: date
            };
            groups.push(newItem);
            localStorage.setItem("GroupsDB", JSON.stringify(groups));
          }
        } else if (dataName[0] == "Roles") {
          let roles = JSON.parse(localStorage.getItem("RolesDB") || '');
          if (roles == null || roles.length <= 0) {
            let newRoles = [{
              id: 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
              createBy: localStorage.getItem("token"),
              createAt: date
            }];
            localStorage.setItem("RolesDB", JSON.stringify(newRoles));
          } else {
            let roles = JSON.parse(localStorage.getItem("RolesDB") || '');
            let lastItem = roles[roles.length - 1];
            let newItem = {
              id: lastItem.id + 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
              createBy: localStorage.getItem("token"),
              createAt: date
            };
            roles.push(newItem);
            localStorage.setItem("RolesDB", JSON.stringify(roles));
          }
        }

        (<HTMLInputElement>document.getElementById("inputValue")).value = "";
        this.getCounts();
        this.getData(dataName[0]);
        document.getElementById("alert")!.style.display = "none";
      } else {
        let name = document.getElementById("model-title")!.innerHTML;
        let dataName = name.split(" ");

        if (dataName[0] == "Groups") {
          let groups = JSON.parse(localStorage.getItem("GroupsDB") || '');
          groups.find((x: any) => x.id == this.elementId).name = (<HTMLInputElement>document.getElementById("inputValue")).value;
          localStorage.setItem("GroupsDB", JSON.stringify(groups));
        } else if (dataName[0] == "Roles") {
          let roles = JSON.parse(localStorage.getItem("RolesDB") || '');
          roles.find((x: any) => x.id == this.elementId).name = (<HTMLInputElement>document.getElementById("inputValue")).value;
          localStorage.setItem("RolesDB", JSON.stringify(roles));
        }

        (<HTMLInputElement>document.getElementById("inputValue")).value = "";
        this.getCounts();
        this.getData(dataName[0]);
        this.isEdit = false;
        document.getElementById("alert")!.style.display = "none";
      }
    } else {
      document.getElementById("alert")!.style.display = "";
    }
  }

  getCounts() {
    let countGroups = (JSON.parse(localStorage.getItem("GroupsDB") || 'null'));
    if (countGroups != null) {
      document.getElementById("groups-count")!.innerHTML = countGroups.length;
    } else {
      document.getElementById("groups-count")!.innerHTML = "0";
    }

    let countRoles = (JSON.parse(localStorage.getItem("RolesDB") || 'null'));
    if (countRoles != null) {
      document.getElementById("roles-count")!.innerHTML = countRoles.length;
    } else {
      document.getElementById("roles-count")!.innerHTML = "0";
    }
  }

  getData(name: string) {
    this.data = [];
    this.data = JSON.parse(localStorage.getItem(name + "DB") || 'null')
    if (this.data != null) {
      this.data = JSON.parse(localStorage.getItem(name + "DB") || 'null')
    } else {
      this.data = [];
    }
  }

  DeleteElement(id: string) {
    let name = document.getElementById("model-title")!.innerHTML;
    let dataName = name.split(" ");
    let data = (JSON.parse(localStorage.getItem(dataName[0] + "DB") || ''));

    this.data = data.filter((x: any) => x.id != id)
    localStorage.setItem(dataName[0] + "DB", JSON.stringify(this.data));
    this.getCounts();
    this.isEdit = false
  }

  EditElement(id: string) {
    let name = document.getElementById("model-title")!.innerHTML;
    let dataName = name.split(" ");
    let data = (JSON.parse(localStorage.getItem(dataName[0] + "DB") || ''));

    let element = data.find((x: any) => x.id == id);
    (<HTMLInputElement>document.getElementById("inputValue")).value = element.name;
    this.elementId = element.id;
    this.isEdit = true;
  }


}
