import { OTP_RESOURCE_TYPES } from '../enums';

export interface validateOtpReq {
    otp: string | number;
    email: string;
    otpId: string;
}

export interface validateOtpRes {
    isValid: boolean;
    message: string;
    developer_message?: string;
}

export interface IsaveOtp {
    resourceId: string;
    resourceType?: OTP_RESOURCE_TYPES;
    otp: string | number;
    requestSource: string;
}
