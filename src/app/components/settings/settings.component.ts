import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowModalComponent } from '../common/show-modal/show-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  Groups = JSON.parse(localStorage.getItem("GroupsDB") || "[]")
  Roles = JSON.parse(localStorage.getItem("RolesDB") || "[]")
  dataName: string = "";
  showModal : any

  constructor() { }
  @ViewChild(ShowModalComponent) modalShow: ShowModalComponent

  ngOnInit(): void {

    }
  ngAfterViewInit(): void {
    this.showModal 
    
  }

  showModel(name: string) {
    (<HTMLInputElement>document.getElementById("inputValue")).value = "";
    document.getElementById("model-title")!.innerHTML = name + " Model"
    document.getElementById("label-name")!.innerHTML = "Name of " + name
    document.getElementById("label-table")!.innerHTML = name + " Table"
    this.dataName = name;
    this.modalShow.getData(name)
    
    
  }

}
