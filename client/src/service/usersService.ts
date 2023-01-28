import { ApiRequest } from '../common/apiRequest';

export const userService = {
    searchUsers: async (params: any) => {
        return await ApiRequest({
            method: 'get',
            params,
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/user/search`,
        });
    },
    getLoggedUserData: async () => {
        return await ApiRequest({
            method: 'get',
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/user`,
        });
    },
};
