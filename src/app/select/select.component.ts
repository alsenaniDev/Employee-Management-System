import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() label : string
  @Input() controlName : string
  @Input() getChange : string
  @Input() list : any
  @Input() value : any
  @Input() name : any
  constructor() { }

  ngOnInit(): void {
  }

}
