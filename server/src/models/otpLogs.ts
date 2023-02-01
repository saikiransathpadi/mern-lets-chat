import mongoose from 'mongoose';
const { Schema } = mongoose;
import { OTP_RESOURCE_TYPES } from '../enums';

const OtpLogsSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    otp: {
        type: String,
        immutable: true,
    },
    resourceType: {
        type: String,
        required: true,
        enum: OTP_RESOURCE_TYPES,
    },
    // email id or mobile number
    resourceId: {
        type: String,
        required: true,
        trim: true,
    },
    requestSource: {
        type: String,
        required: true,
        trim: true,
    },
    createdOn: {
        type: Date,
        default: new Date(),
        immutable: true,
    },
    expiryOn: {
        type: Date,
        default: new Date(),
        immutable: true,
    },
    verifiedOn: Date,
    verificationResult: String,
});

export const OtpLogs = mongoose.model('otp_logs', OtpLogsSchema);
