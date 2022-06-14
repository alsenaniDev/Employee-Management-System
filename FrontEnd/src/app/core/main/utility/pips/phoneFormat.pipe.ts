import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'phoneFormat'
})

export class PhoneFormat implements PipeTransform {
    transform(value: string, ...args: any[]) {
        var cleaned = ('' + value).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    }
}