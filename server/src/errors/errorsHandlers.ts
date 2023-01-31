export class ServiceException {
    statusCode: number;
    message: string;
    developer_message: string;
    error: any;
    constructor(statusCode: number, message: string, error?: any, developer_message?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.developer_message = developer_message;
    }
}
