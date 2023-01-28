import { NextFunction, Request, Response } from 'express';
import { AUTH, RESPONSE_MESSAGES, STATUS_CODES } from '../enums';
import { sign, verify } from 'jsonwebtoken';
import { getUserByEmail } from '../db/dal/usersDal';
import { IExpressReqWithUser } from '../interface/request';
const SECRET: any = process.env.SECRET;

export const authenticatedRouter = async (req: IExpressReqWithUser, res: Response, next: NextFunction) => {
    console.log('Auth Validation.......');
    try {
        const accessTokenFromClient: string = req.header('authorization') as any;
        if (!accessTokenFromClient)
            return res
                .status(STATUS_CODES.UNAUTHORIZED)
                .json({ message: RESPONSE_MESSAGES.UNAUTHORIZED, developer_message: RESPONSE_MESSAGES.TOKEN_MISSING });

        const data: any = verify(accessTokenFromClient, SECRET, { algorithms: [AUTH.TOKEN_ALGORITHM] });
        req.user = data
        await getUserByEmail(data.email);
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: RESPONSE_MESSAGES.UNAUTHORIZED,
            developer_message: error.message,
        });
    }
};

export const generateJwtToken = async (body: { [key: string]: string }): Promise<string> => {
    const token = sign(body, SECRET, { expiresIn: AUTH.TOKEN_EXPIRES_IN, algorithm: AUTH.TOKEN_ALGORITHM });
    return token;
};
