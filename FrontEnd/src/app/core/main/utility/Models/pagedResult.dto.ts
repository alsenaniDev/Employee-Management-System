import { SettingsDto } from "../../pages/settings/Settings.Dto";

export class pagedResultRequest {
    // why class??
    pageNum?: number = 1;
    pageLimit?: number = 5;
}

export interface pagedResultResponse<T> {
    result: Array<T>;
    totalRecords: number;
}

// example
export class getAllUsersModelDto extends pagedResultRequest {
    role?: number;
    groups?: number[]
}