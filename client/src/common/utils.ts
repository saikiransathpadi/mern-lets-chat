import { get } from "lodash";

export const isValidPassword = (password: string) => {
    return Boolean(/[a-zA-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8);
};

export const isValidEmail = (email: string) => {
    const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    return Boolean(regex.test(email));
};

export const getUserSessionStorege = () => {
    return {
        token: window.sessionStorage.getItem('user_token'),
        email: window.sessionStorage.getItem('user_email'),
    };
};

export const clearUserSessionStorate = () => {
    window.sessionStorage.removeItem('user_token');
    window.sessionStorage.removeItem('user_email');
};

export const setUserSessionStorage = ({ token, email }: any) => {
    window.sessionStorage.setItem('user_token', token);
    window.sessionStorage.setItem('user_email', email);
};

export const getSenderName = (loggedUser: { [key: string]: any }, users: any[]) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderData = (loggedUser: { [key: string]: any }, users: any[]) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = ({messages, index, userId}: any) => {
    return get(messages, `[${index}].sender._id`) !== userId; 
}

export const isLastMessage = ({messages, index, userId}: any) => {
    return get(messages, `[${index}].sender._id`) !== get(messages, `[${index + 1}].sender._id`);
}

export const trimMessage = (message: any, count = 9) => {
    if (!message || message.length <=count) return message
    return `${message.slice(0,count)}...`
}