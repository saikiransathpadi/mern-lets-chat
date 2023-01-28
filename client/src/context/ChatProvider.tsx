import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearUserSessionStorate, getUserSessionStorege } from '../common/utils';
import { chatService } from '../service/chatService';
import { userService } from '../service/usersService';

const ChatContext: any = createContext({ signOut: () => {}, userData: {}, notifications: [], callUserChats: () => {} });

export const ChatProvider = ({ children }: any) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const { token, email } = getUserSessionStorege();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([])

    const signOut = () => {
        clearUserSessionStorate();
        navigate('/login');
    };
    useEffect(() => {
        if (!token || !email) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUser = async () => {
        if (token) {
            const resp = await userService.getLoggedUserData();
            setUserData(resp.data.result.user);
        }
    };

    const callUserChats = async (updateSelected?: boolean) => {
        const resp = await chatService.getUserChats();
        const allChats = resp.data.result.chats;
        setChats(allChats);
        if (updateSelected) {
            setSelectedChat(allChats.find((i: any) => i._id === (selectedChat || ({} as any))._id));
        }
    };

    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const values = {
        signOut,
        userData,
        selectedChat,
        setSelectedChat,
        chats,
        callUserChats,
        notifications,
        setNotifications,
    };

    return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export const ChatContextState = () => useContext(ChatContext);
