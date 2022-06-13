import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[phoneValidation]'
})

export class PhoneNumberValidation {
    constructor(private elementRef: ElementRef) { }

    @HostListener('input') onInput() {
        this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }
}