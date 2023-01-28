import { ApiRequest } from '../common/apiRequest';

export const securityService = {
    userSignUp: async (data: any) => {
        return await ApiRequest({
            method: 'post',
            data,
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/user/signup`,
        });
    },
    userLogin: async (data: any) => {
        return await ApiRequest({
            method: 'post',
            data,
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/user/login`,
        });
    },
};
