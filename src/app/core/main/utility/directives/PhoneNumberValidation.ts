import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[phoneValidation]'
})

export class PhoneNumberValidation {
    @Input('phoneValidation') ControlName: string;
    constructor(private elementRef: ElementRef) { }

    @HostListener('input') onInput() {
        if (this.ControlName == "phoneNumber") {
            this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        }
    }
}