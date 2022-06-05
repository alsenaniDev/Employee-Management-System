import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: "root" })
export class AlertMessageServices {
    
    constructor(private messageService: MessageService,) { }


    success(details: string) {
        this.messageService.add({ severity: "success", summary: 'Successful', detail: details, life: 3000, });
    }

    error(details: string) {
        this.messageService.add({ severity: "error", summary: 'Error', detail: details, life: 3000, })
    }

    Warning(details: string) {
        this.messageService.add({ severity: "warn", summary: 'Warring', detail: details, life: 3000, })
    }


}