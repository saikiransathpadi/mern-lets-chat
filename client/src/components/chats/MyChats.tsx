import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getSenderName, trimMessage } from '../../common/utils';
import { ChatContextState } from '../../context/ChatProvider';
import { ChatLoading } from './ChatLoading';
import { CreateGroupModal } from './CreateGroupChatModal';

export const MyChats = () => {
    const { chats, selectedChat, setSelectedChat, userData, callUserChats }: any = ChatContextState();
    const [loading, setLoading] = useState(false);
    const getChat = async () => {
        setLoading(true);
        await callUserChats();
        console.log(chats)
        setLoading(false);
    };
    useEffect(() => {
        getChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box
            display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
            flexDir='column'
            alignItems={'center'}
            bg='white'
            borderRadius={'lg'}
            borderWidth={'1px'}
            p={3}
            width={{ base: '100%', md: '26%' }}
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: '28px', md: '30px' }}
                fontFamily='Serif Georgia'
                display='flex'
                width={'100%'}
                justifyContent='space-between'
                alignItems={'center'}
            >
                My Chats
                <CreateGroupModal>
                    <Button display={'flex'} fontSize={{ base: '20px', md: '10px' }} fontFamily='Serif Georgia' rightIcon={<AddIcon />}>
                        New Group
                    </Button>
                </CreateGroupModal>
            </Box>
            <Box display={'flex'} flexDir='column' borderRadius={'lg'} overflowY='hidden' width={'100%'}>
                {loading ? (
                    <ChatLoading count={10} />
                ) : (
                    <Stack overflowY={'scroll'}>
                        {(chats || []).map((eachChat: any) => {
                            const tempChat = selectedChat || {};
                            return (
                                <Box
                                    onClick={() => setSelectedChat(eachChat)}
                                    key={eachChat._id}
                                    px={3}
                                    py={2}
                                    bg={tempChat._id === eachChat._id ? '#5fa5b6e8' : '#e7ebece8'}
                                    _hover={{
                                        bg: '#5fa5b6e8',
                                    }}
                                    borderRadius={'lg'}
                                    cursor='pointer'
                                    width={'100%'}
                                >
                                    <Text>{eachChat.isGroupChat ? eachChat.chatName : getSenderName(userData, eachChat.users)}</Text>
                                    <Text>
                                        {trimMessage(eachChat.latestMessage.content)} <b>Email: </b>
                                        {trimMessage(eachChat.latestMessage.sender.email, 20)}
                                    </Text>
                                </Box>
                            );
                        })}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};
