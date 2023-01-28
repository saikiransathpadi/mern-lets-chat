import { Request } from 'express';

export interface IExpressReqWithUser extends Request {
    user?: {
        id?: string;
        email?: string;
    };
}
