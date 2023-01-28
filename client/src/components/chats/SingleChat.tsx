import { ArrowBackIcon, ArrowRightIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getSenderData, getSenderName } from '../../common/utils';
import { ChatContextState } from '../../context/ChatProvider';
import { messageService } from '../../service/messageService';
import { UserProfileModal } from '../user/UserProfile';
import { ScrollableChat } from './ScrollableChat';
import { UpdateGroupModal } from './UpdateGroupModal';
import animationData from '../../animations/typing.json'
import Lottie from 'react-lottie'

const SERVER: any = process.env.REACT_APP_SERVER_HOST;
var socket: any, selectedChatCompare: any;

const defaultTypingAninmeOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export const SingleChat = () => {
    const { userData, selectedChat, setSelectedChat, notifications }: any = ChatContextState();
    const [chatName, setChatName] = useState((selectedChat || {}).chatName);
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket = io(SERVER);
        socket.emit('setup', userData);
        socket.on('connected', () => {
            setSocketConnected(true);
        });
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop_typing', () => setIsTyping(false));
    }, [userData]);

    useEffect(() => {
        socket.on('messaged_received', (newMessage: any) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
                if (!notifications.includes(newMessage)) {
                    // console.log('ading notificatinos');
                    // setNotifications([newMessage, ...notifications]);
                    // callUserChats();
                }
            } else {
                setMessages([...messages, newMessage]);
            }
        });
    });

    const sendMessage = async () => {
        console.log('enterrree');
        if (!newMessage) return;
        socket.emit('stop_typing', selectedChat._id);
        const resp: any = await messageService.sendMessage({
            chatId: selectedChat._id,
            content: newMessage,
        });
        socket.emit('new_message', resp.data.result);
        setMessages([...messages, resp.data.result]);
        setNewMessage('');
    };

    useEffect(() => {
        setChatName((selectedChat || {}).chatName);
    }, [selectedChat]);

    useEffect(() => {
        getMessages();
        selectedChatCompare = selectedChat;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedChat]);

    const getMessages = async () => {
        if (!selectedChat) return;
        setLoading(true);

        const resp = await messageService.getChatMessages(selectedChat._id);
        setLoading(false);
        setMessages(resp.data.result.messages);
        socket.emit('join_chat', selectedChat._id);
    };

    const handleMesssageChange = async ({ target: { value } }: any) => {
        setNewMessage(value);
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        const now = new Date().getTime();
        setTimeout(() => {
            const after = new Date().getTime();
            if (after - now >= 3000 && typing) {

                socket.emit('stop_typing', selectedChat._id);
                setTyping(false);
            }
        }, 3000);
    };

    return (
        <>
            {selectedChat && (
                <>
                    <Text
                        fontSize={{ base: '28px', md: '30px' }}
                        p={2.5}
                        w='100%'
                        display={'flex'}
                        justifyContent='space-between'
                        alignItems={'center'}
                    >
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat()}
                            aria-label={'back'}
                        />
                        <b style={{ textTransform: 'capitalize' }}>
                            {selectedChat.isGroupChat ? chatName : getSenderName(userData, selectedChat.users)}
                        </b>
                        {!selectedChat.isGroupChat ? (
                            <UserProfileModal user={getSenderData(userData, selectedChat.users)}>
                                <IconButton display='flex' icon={<InfoIcon />} aria-label={'back'} />
                            </UserProfileModal>
                        ) : (
                            <UpdateGroupModal chat={selectedChat}>
                                <IconButton display='flex' icon={<InfoIcon />} aria-label={'back'} />
                            </UpdateGroupModal>
                        )}
                    </Text>
                    <Box
                        display={'flex'}
                        flexDir='column'
                        justifyContent={'flex-end'}
                        width='100%'
                        borderRadius={'lg'}
                        overflowY='hidden'
                        bg={'#E8E8E8'}
                        height='100%'
                        padding={3}
                    >
                        {loading ? (
                            <Spinner size={'xl'} w={20} h={20} display='flex' alignSelf={'center'} margin='auto' />
                        ) : (
                            <>
                                <div className='messages'>
                                    {' '}
                                    <ScrollableChat messages={messages} />
                                </div>
                            </>
                        )}
                        <FormControl isRequired mt={3}>
                            {isTyping ? (
                                <div>

                                    <Lottie options={defaultTypingAninmeOptions} width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
                                </div>
                            ) : <></>}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage();
                                }}
                            >
                                <InputGroup>
                                    <Input
                                        placeholder='Message Here...'
                                        variant='filled'
                                        onChange={handleMesssageChange}
                                        value={newMessage}
                                    />
                                    <InputRightElement
                                        children={<ArrowRightIcon color='green.500' onClick={sendMessage} mr={5} cursor='pointer' />}
                                    />
                                </InputGroup>
                            </form>
                        </FormControl>
                    </Box>
                </>
            )}
            {!selectedChat && (
                <Box display={'flex'} alignItems='center' justifyContent={'center'} height='100%'>
                    <Text fontSize={'3xl'}> Click on any user to start chat</Text>
                </Box>
            )}
        </>
    );
};
