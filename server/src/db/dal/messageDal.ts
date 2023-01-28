import { Chat } from '../../models/chatsModel';
import { Message } from '../../models/messagesModel';
import { User } from '../../models/usersModel';

export const sendMessageDb = async (body: { [key: string]: any }) => {
    try {
        let messageBody = await Message.create(body);
        messageBody = await messageBody.populate([{ path: 'sender', select: 'name email' }, 'chat']);
        messageBody = await User.populate(messageBody, { path: 'chat.users', select: 'name email' });
        const res = await Chat.findByIdAndUpdate(body.chat, { latestMessage: messageBody });

        return messageBody;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getChatMessagesDb = async (chatId: string) => {
    try {
        let allMessages = await Message.find({ chat: chatId })
            .populate([{ path: 'sender', select: 'name email profilePic' }, 'chat'])
            .sort({ updatedAt: 1 });
        allMessages = await User.populate(allMessages, { path: 'chat.users', select: 'name email profilePic' });

        return allMessages;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
