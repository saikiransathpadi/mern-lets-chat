import { Request, Response } from 'express';
import { saveOtpDb } from '../db/dal';
import { updateUserByQueryDb } from '../db/dal/usersDal';
import { STATUS_CODES } from '../enums';
import { validateOtpRes } from '../interfaces';
import { sendEmail } from '../utils/email';
import { EMAIL_SUBJECTS, generateOtpSixDigit, getOtpEmailTemplateBySource } from '../utils/helper';
import { validateAndUpdateOtpLogsBLL } from './BLL/otpLogsBLL';


export const sendOtpForEmailVerification = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const otp = generateOtpSixDigit();
        const { email: resourceId, source: requestSource } = body;
        const [otpResp]: any = await Promise.all([
            saveOtpDb({ otp, resourceId, requestSource }),
            sendEmail(resourceId, EMAIL_SUBJECTS.OPT_VERIFICATION_SUBJECT, getOtpEmailTemplateBySource(requestSource, otp)),
        ]);
        return res.status(STATUS_CODES.SUCCESS).json({
            message: 'Success',
            result: { otpId: otpResp.result.id },
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.error ? error.error.message : error.message,
        });
    }
};

export const validateAndUpdateOtpLogs = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { isValid, message }: validateOtpRes = await validateAndUpdateOtpLogsBLL(body);
        if (isValid) {
            await updateUserByQueryDb({ isEmailVerified: true }, { email: body.email });
        }
        return res.status(STATUS_CODES.SUCCESS).json({
            result: {
                isValid,
                message,
            },
        });
    } catch (error: any) {
        console.log(error);
        return res.status(error.statusCode || STATUS_CODES.SERVER_ERROR).json({
            error,
            message: error.message,
            developer_message: error.developer_message || error.message,
        });
    }
};