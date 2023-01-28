import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ChatBox } from '../components/chats/ChatBox';
import { MyChats } from '../components/chats/MyChats';
import { SideDrawer } from '../components/chats/SideDrawer';

export const ChatPage = () => {
    const fetchChats = async () => {
        try {
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchChats();
    }, []);
    return (
        <div style={{ width: '100%' }}>
            <SideDrawer />
            <Box display='flex' justifyContent='space-between' w={'100%'} h='91.5vh' p='10px'>
                <MyChats />
                <ChatBox />
            </Box>
        </div>
    );
};
