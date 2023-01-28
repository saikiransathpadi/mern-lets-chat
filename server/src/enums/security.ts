export enum AUTH {
    TOKEN_EXPIRES_IN = '7d',
    TOKEN_ALGORITHM = 'HS256',
}

export enum VALIDATION_MESSAGES {
    email = 'It should be in the format of {user}@{mail Type}.{domain},',
    mobile = 'It should be numeric containing 10 digits.',
    password = `It should have a minimum of 8 charactors, one upper, one lower case, 1 digit and one special charactor with no spaces`,
    INCORRECT_OTP = 'Incorrect Otp, Please try again.',
    OTP_EXPIRED = 'Otp expired, Please try again.',
}

export enum OTP_RESOURCE_TYPES {
    EMAIL = 'email',
    MOBILE = 'mobile',
}

export enum OTP_REQUEST_SOURCE {
    SIGNIN = 'signin',
    FORGOT_PASSWORD = 'forgot_password',
    PROFILE = 'profile',
}
