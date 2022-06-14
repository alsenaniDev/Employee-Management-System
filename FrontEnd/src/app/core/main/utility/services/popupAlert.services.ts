import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AlertModel } from './AlertModel';
@Injectable({ providedIn: "root" })
export class popupAlertMessage {
    constructor(
        private confirmationService: ConfirmationService,
    ) {

    }

    servicesAlert(model: AlertModel) {
        this.confirmationService.confirm({
            header: model.header,
            message: model.message,
            icon: model.icon,
            acceptLabel: model.acceptLabel,
            rejectLabel: model.cancelLabel,
            // icon: "pi pi-exclamation-triangle",
            accept: () => {
                model.operations()
            }
        })
    }
}

