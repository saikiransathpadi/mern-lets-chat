import { ApiRequest } from '../common/apiRequest';

export const chatService = {
    accessChat: async (userId: string) => {
        return await ApiRequest({
            method: 'post',
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/chat/${userId}`,
        });
    },
    getUserChats: async () => {
        return await ApiRequest({
            method: 'get',
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/chat`,
        });
    },
    createGroupChat: async (data: any) => {
        return await ApiRequest({
            method: 'post',
            data,
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/chat/group/create`,
        });
    },
    updateGroupChat: async (data: any, chatId: string) => {
        return await ApiRequest({
            method: 'put',
            data,
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/chat/group/update/${chatId}`,
        });
    },
};
