export enum STATUS_CODES {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    ACCEPTED = 202,
    SERVER_ERROR = 500,
    NOT_FOUND = 404,
}

export enum RESPONSE_MESSAGES {
    UNAUTHORIZED = 'User is not authorized with an explicit deny.',
    TOKEN_MISSING = 'Token is missing',
    SUCCESS = 'SUCCESS',
    GENERAL_MESSAGE = 'Something went wrong, Please try again',
    GENERAL_MESSAGE_CONTACT = 'Something went wrong, Please contact customer care',
}
