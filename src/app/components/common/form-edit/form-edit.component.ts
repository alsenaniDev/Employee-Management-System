import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  @Input() label: string
  @Input() ControlName: string
  @Input() formName: any
  @Input() type: any
  @Input() id: any


  constructor() { }

  ngOnInit(): void {
  }

}
