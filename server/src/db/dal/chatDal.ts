import { Chat } from '../../models/chatsModel';
import { User } from '../../models/usersModel';

export const getOrCreateChat = async (userId: string, hostUserid?: string) => {
    try {
        let chatData: any = await Chat.find({
            isGroupChat: false,
            $and: [{ users: { $elemMatch: { $eq: userId } } }, { users: { $elemMatch: { $eq: hostUserid } } }],
        })
            .populate('users', '-password')
            .populate('latestMessage');
        chatData = await User.populate(chatData, {
            path: 'latestMessage.sender',
            select: 'name email profilePic',
        });
        if (chatData.length) return chatData[0];
        const createdChat = await Chat.create({
            chatName: 'sender',
            isGroupChat: false,
            users: [userId, hostUserid],
        });
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
        return fullChat;
    } catch (error) {
        throw error;
    }
};

export const getUserChatsDb = async (userId: string) => {
    let chats: any = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 });
    chats = await User.populate(chats, { path: 'latestMessage.sender', select: 'name email profilePic' });
    return chats;
};

export const createGroupChatDb = async (users: string[], groupName: string, adminId: string) => {
    const chatData: any = await Chat.create({
        users,
        chatName: groupName,
        groupAdmin: adminId,
        isGroupChat: true,
    });
    const chatWithUserData = await Chat.find({ _id: chatData._id }).populate('users', '-password').populate('groupAdmin', '-password');
    return chatWithUserData;
};

export const updateChatByQuery = async (body: { [key: string]: any }, filterQuery: { [key: string]: any }) => {
    const chatData: any = await Chat.updateOne(filterQuery, body);
    return chatData;
};

export const updateGroupChatDb = async (body: { [key: string]: any }, groupAdmin: string) => {
    const updateQuery: any = {};
    if (body.chatName) {
        updateQuery.chatName = body.chatName;
    }
    if (body.addUsers) {
        updateQuery.$addToSet = {
            users: { $each: body.addUsers },
        };
    }
    if (body.removeUsers) {
        updateQuery.$pull = {
            users: { $in: body.removeUsers },
        };
    }
    if (body.users) {
        updateQuery.$set = {
            users: body.users
        }
    }
    const updatedData = await updateChatByQuery(updateQuery, { _id: body.chatId, isGroupChat: true, groupAdmin });
    return updatedData;
};
