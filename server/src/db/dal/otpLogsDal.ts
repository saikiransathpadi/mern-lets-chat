import { OTP_RESOURCE_TYPES, STATUS_CODES } from '../../enums';
import { ServiceException } from '../../errors/errorsHandlers';
import { dbRes, IsaveOtp } from '../../interfaces';
import { OtpLogs } from '../../models';
import { v4 as uuid4 } from 'uuid';
import { addMinutes, getIstTime } from '../../utils/dateTime';


export const saveOtpDb = async ({ otp, resourceId, resourceType = OTP_RESOURCE_TYPES.EMAIL, requestSource }: IsaveOtp): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const id = uuid4();
        const createdOn = getIstTime();
        const expiryOn = addMinutes(createdOn, parseInt(process.env.OTP_EXPIRY_MIN as any));
        const resp: any = await OtpLogs.create({
            id,
            resourceId,
            resourceType,
            requestSource,
            createdOn,
            expiryOn,
            otp,
        });
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const getOtpLogByIdAndResource = async (otpId: string, resourceId: string): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const resp: any = await OtpLogs.findOne({ id: otpId, resourceId });
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};

export const updateOtplog = async (otpId: string, data: any): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        const resp: any = await OtpLogs.updateOne({ id: otpId }, data);
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};