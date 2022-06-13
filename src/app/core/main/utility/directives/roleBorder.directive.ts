import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[roleBorder]'
})

export class RoleBorderDirective {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        let element = this.elementRef.nativeElement.innerText;
        if (element == "Admin" || element == "Super-Admin") {
            this.elementRef.nativeElement.style.border = '1px solid rgb(215 0 0)';
            this.elementRef.nativeElement.style.borderRadius = '5px';
            this.elementRef.nativeElement.style.padding = '2px 5px';
        } else if (element == "BackEnd") {
            this.elementRef.nativeElement.style.border = '1px solid rgb(13 2 209)';
            this.elementRef.nativeElement.style.borderRadius = '5px';
            this.elementRef.nativeElement.style.padding = '2px 5px';
        } else if (element == "FrontEnd") {
            this.elementRef.nativeElement.style.border = '1px solid rgb(213 237 0)';
            this.elementRef.nativeElement.style.borderRadius = '5px';
            this.elementRef.nativeElement.style.padding = '2px 5px';
        } else if (element == "FullStack") {
            this.elementRef.nativeElement.style.border = '1px solid rgb(172 173 170)';
            this.elementRef.nativeElement.style.borderRadius = '5px';
            this.elementRef.nativeElement.style.padding = '2px 5px';
        }
    }
}