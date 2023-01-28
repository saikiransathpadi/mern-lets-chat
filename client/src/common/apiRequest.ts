import axios from 'axios';
import { clearUserSessionStorate } from './utils';

export const ApiRequest = async (options: any) => {
    console.log('api call');
    try {
        options = {
            ...options,
            headers: {
                ...options.headers,
                authorization: window.sessionStorage.getItem('user_token'),
                'Content-Type': 'application/json',
            },
        };
        const response: any = await axios(options);
        console.log(response);
        if (response.error && response.error.response.status === 401) {
            console.log(response.error.response.status);
        }
        return response;
    } catch (error: any) {
        if (error && error.response.status === 401) {
            console.log(error.response.status);
            clearUserSessionStorate()
            window.location.reload();
        }
        console.log(error);
        return error;
    }
};
