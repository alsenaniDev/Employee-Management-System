import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class ThemeChangeService {
    BarColor: string = '';
    constructor() {
        console.log(this.BarColor);
    }
}