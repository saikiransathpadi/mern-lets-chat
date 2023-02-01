import nodemailer from 'nodemailer';
import { COMPANY } from './helper';

export const sendEmail = async (toAddresses: string | string[], subject: string, html: string) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_EMAIL_APP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: {
            name: COMPANY,
            address: process.env.FROM_EMAIL as any,
        },
        to: toAddresses,
        subject,
        html,
    });

    console.log('Message sent: %s', info.messageId);
};
