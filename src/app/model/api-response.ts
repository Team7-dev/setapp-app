import { InModel } from './in-model';

export class ApiResponse extends InModel {
    status: string;
    message: string;
    errorCode: number;
    result;
    className: string;
    array: boolean;
}
