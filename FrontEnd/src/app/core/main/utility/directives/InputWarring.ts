import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[InputWarring]'
})

export class InputWarring {
    @Input('InputWarring') inputType: string;
    constructor(private el: ElementRef) { }


    ngAfterViewChecked() {
        let elementValue = this.el.nativeElement.value
        if (this.inputType == "text" && elementValue.match((/[^a-zA-Z0-9-]/)) && elementValue.length > 0) {
            this.el.nativeElement.style.border = '1px solid #ffd400'
        } else {
            this.el.nativeElement.style.border = '1px solid #ced4da'
        }
    }
}