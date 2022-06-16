export class AlertModel {
    header: string;
    message: string;
    operations: () => void;
    icon?: string;
    cancelLabel?: string;
    acceptLabel?: string;
}