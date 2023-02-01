import { NextFunction, Request, Response } from 'express';
import { validateAndUpdateOtpLogsBLL } from '../controller/BLL/otpLogsBLL';
import { STATUS_CODES } from '../enums';

export const isValidPassword = (password: string) => {
    return Boolean(/[a-zA-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8);
};

export const isValidEmail = (email: string) => {
    const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    return Boolean(regex.test(email));
};

export const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const mandatoryFields = ['name', 'email', 'password'];
        let isValid = true;
        mandatoryFields.forEach((item) => {
            if (!req.body[item]) {
                isValid = false;
                throw new Error(`Mandatory field ${item} is missing or invalid`);
            }
        });

        if (!isValidPassword(req.body.password)) {
            throw new Error('Password should have minimum eight characters, at least one letter and one number');
        }

        if (!isValidEmail(req.body.email)) {
            throw new Error('Email should be in the format of {user}@{mail Type}.{domain}');
        }

        next();
    } catch (error: any) {
        return res.status(400).json({
            error,
            message: error.message,
        });
    }
};

export const validateAndUpdateOtpLogsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validateAndUpdateOtpLogsBLL(req.body);
        req.body.isEmailVerified = true;
        next();
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.developer_message || error.error ? error.error.message : error.message,
        });
    }
};
