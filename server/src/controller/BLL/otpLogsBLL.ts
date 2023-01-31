import { getOtpLogByIdAndResource, updateOtplog } from '../../db/dal';
import { STATUS_CODES, VALIDATION_MESSAGES } from '../../enums';
import { ServiceException } from '../../errors/errorsHandlers';
import { dbRes, validateOtpReq, validateOtpRes } from '../../interfaces';
import { getIstTime } from '../../utils/dateTime';

export const validateAndUpdateOtpLogsBLL = async ({ otpId, email, otp }: validateOtpReq): Promise<validateOtpRes> => {
    const otpLogUpdateData: any = {
        verifiedOn: getIstTime(),
    };
    try {
        const otpLogRes: dbRes = await getOtpLogByIdAndResource(otpId, email);
        const otpData = otpLogRes.result;
        if (!otpData) {
            throw new ServiceException(
                STATUS_CODES.BAD_REQUEST,
                VALIDATION_MESSAGES.INCORRECT_OTP,
                null,
                'No record found with otp id and email.'
            );
        }
        validateOtp(otp, otpData, otpLogUpdateData.verifiedOn);
        otpLogUpdateData.verificationResult = 'success';
        await updateOtplog(otpId, otpLogUpdateData);
        return {
            isValid: true,
            message: 'success',
            developer_message: 'success',
        };
    } catch (error: any) {
        otpLogUpdateData.verificationResult = error.message;
        await updateOtplog(otpId, otpLogUpdateData);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, error.message, {}, error.developer_message);
    }
};

export const validateOtp = (otp: string | number, otpLog: { [key: string]: any }, now: Date) => {
    if (otp == otpLog.otp) {
        if (now > otpLog.expiryOn) {
            throw new ServiceException(STATUS_CODES.BAD_REQUEST, VALIDATION_MESSAGES.OTP_EXPIRED);
        }
    } else {
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, VALIDATION_MESSAGES.INCORRECT_OTP);
    }
};
