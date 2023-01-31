export interface apiRes {
    result: any[] | { [key: string]: any } | number;
    message: string;
    developer_message?: string;
    error?: any;
}

export interface dbRes {
    result: any;
    error?: any;
    message?: string;
}
