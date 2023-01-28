import { ApiRequest } from '../common/apiRequest';

export const messageService = {
    getChatMessages: async (chatId: any) => {
        return await ApiRequest({
            method: 'get',
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/message/chat/${chatId}`,
        });
    },
    sendMessage: async (data: any) => {
        return await ApiRequest({
            method: 'post',
            url: `${process.env.REACT_APP_CHATAPP_HOST}/v1/message`,
            data,
        });
    },
};
