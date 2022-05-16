import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  data: any = [];
  isEdit: boolean = false;
  elementId: string = "";
  dataName: string = "";
  constructor() { }

  ngOnInit(): void {
    this.getCounts();
  }

  showModel(name: string) {
    (<HTMLInputElement>document.getElementById("inputValue")).value = "";
    document.getElementById("model-title")!.innerHTML = name + " Model"
    document.getElementById("label-name")!.innerHTML = "Name of " + name
    document.getElementById("label-table")!.innerHTML = name + " Table"
    this.dataName = name;
    this.getData(name)
  }

  AddData() {
    if ((<HTMLInputElement>document.getElementById("inputValue")).value != "") {
      if (this.isEdit === false) {
        let name = document.getElementById("model-title")!.innerHTML;
        let dataName = name.split(" ");

        if (dataName[0] == "Groups") {
          let groups = localStorage.getItem("Groups");
          if (groups == null) {
            let newGroups = [{
              id: 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
            }];
            localStorage.setItem("Groups", JSON.stringify(newGroups));
          } else {
            let groups = JSON.parse(localStorage.getItem("Groups") || '');
            let lastItem = groups[groups.length - 1];
            let newItem = {
              id: lastItem.id + 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
            };
            groups.push(newItem);
            localStorage.setItem("Groups", JSON.stringify(groups));
          }
        } else if (dataName[0] == "Roles") {
          let roles = localStorage.getItem("Roles");
          if (roles == null) {
            let newRoles = [{
              id: 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
            }];
            localStorage.setItem("Roles", JSON.stringify(newRoles));
          } else {
            let roles = JSON.parse(localStorage.getItem("Roles") || '');
            let lastItem = roles[roles.length - 1];
            let newItem = {
              id: lastItem.id + 1,
              name: (<HTMLInputElement>document.getElementById("inputValue")).value,
            };
            roles.push(newItem);
            localStorage.setItem("Roles", JSON.stringify(roles));
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
          let groups = JSON.parse(localStorage.getItem("Groups") || '');
          groups.find((x: any) => x.id == this.elementId).name = (<HTMLInputElement>document.getElementById("inputValue")).value;
          localStorage.setItem("Groups", JSON.stringify(groups));
        } else if (dataName[0] == "Roles") {
          let roles = JSON.parse(localStorage.getItem("Roles") || '');
          roles.find((x: any) => x.id == this.elementId).name = (<HTMLInputElement>document.getElementById("inputValue")).value;
          localStorage.setItem("Roles", JSON.stringify(roles));
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
    let countGroups = (JSON.parse(localStorage.getItem("Groups") || ''));
    document.getElementById("groups-count")!.innerHTML = countGroups.length;

    let countRoles = (JSON.parse(localStorage.getItem("Roles") || ''));
    document.getElementById("roles-count")!.innerHTML = countRoles.length;
  }

  getData(name: string) {
    this.data = [];
    this.data = JSON.parse(localStorage.getItem(name) || '')
  }

  DeleteElement(id: string) {
    let name = document.getElementById("model-title")!.innerHTML;
    let dataName = name.split(" ");
    let data = (JSON.parse(localStorage.getItem(dataName[0]) || ''));

    this.data = data.filter((x: any) => x.id != id)
    localStorage.setItem(dataName[0], JSON.stringify(this.data));
    this.getCounts();
    this.isEdit = false
  }

  EditElement(id: string) {
    let name = document.getElementById("model-title")!.innerHTML;
    let dataName = name.split(" ");
    let data = (JSON.parse(localStorage.getItem(dataName[0]) || ''));

    let element = data.find((x: any) => x.id == id);
    (<HTMLInputElement>document.getElementById("inputValue")).value = element.name;
    this.elementId = element.id;
    this.isEdit = true;
  }
}
