import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AlertModel } from './AlertModel';
import { ShowUserServices } from './users/show-users/show-users-services';
@Injectable({ providedIn: "root" })
export class popupAlertMessage {
    constructor(
        private confirmationService: ConfirmationService,
        private userServices: ShowUserServices,
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

