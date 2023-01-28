
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { ChatContextState } from '../../context/ChatProvider';
import { UserProfileModal } from '../user/UserProfile';
import { userService } from '../../service/usersService';
import { ChatLoading } from './ChatLoading';
import { UserListItem } from '../user/UserListItem';
import { chatService } from '../../service/chatService';
import { getSenderName } from '../../common/utils';
// @ts-ignore
import NotificationBadge from 'react-notification-badge';
// @ts-ignore
import {Effect} from 'react-notification-badge';

export const SideDrawer = () => {
    const [search, setSearch] = useState('');
    const [searchResp, setSearchResp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const { signOut, userData, setSelectedChat, callUserChats, notifications, setNotifications }: any = ChatContextState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                position: 'top-left',
                duration: 3000,
                status: 'warning',
                title: 'Please input somthing to Search',
            });
            return;
        }
        setLoading(true);
        const resp = await userService.searchUsers({
            name: search,
        });
        setSearchResp(resp.data.result.users);
        setLoading(false);
    };

    const accessChat = async (userId: string) => {
        setChatLoading(true);
        const resp = await chatService.accessChat(userId);
        setSelectedChat(resp.data.result.chatData);
        await callUserChats();
        setChatLoading(false);
        onClose();
    };

    return (
        <>
            <Box
                display={'flex'}
                justifyContent='space-between'
                alignItems={'center'}
                bg='white'
                borderWidth={'5px'}
                p='5px 10px 5px 10px'
                width={'100%'}
            >
                <div>
                    <Tooltip label='Search user' hasArrow>
                        <Button variant='ghost' onClick={onOpen}>
                            <SearchIcon />
                            <Text display={{ base: 'none', md: 'flex' }} px='4'>
                                Search User
                            </Text>
                        </Button>
                    </Tooltip>
                </div>
                <Text fontSize={'2xl'} fontFamily='Serif Georgia'>
                    Let's Chat
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>

                            <NotificationBadge count={notifications.length} effect={Effect.SCALE} />
                            <BellIcon fontSize={'2xl'}/>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notifications.length && 'No new messages'}
                            {notifications.map((eachNotif: any) => {
                                return (
                                    <MenuItem
                                        key={eachNotif._id}
                                        onClick={() => {
                                            setSelectedChat(eachNotif.chat);
                                            setNotifications(notifications.filter((i: any) => i._id !== eachNotif._id));
                                        }}
                                    >
                                        {eachNotif.chat.isGroupChat
                                            ? `New message from group ${eachNotif.chat.chatName}`
                                            : `New Message from ${getSenderName(userData, eachNotif.chat.users)}`}
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton p={2} as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar name={userData.email} src={userData.profilePic} size={'sm'} boxShadow='dark-lg' />
                        </MenuButton>
                        <MenuList>
                            <UserProfileModal user={userData} admin={true}>
                                <MenuItem onClick={() => {}}>My Profile</MenuItem>
                            </UserProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={signOut}>Log Out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search by name or email</DrawerHeader>

                    <DrawerBody>
                        <Box display={'flex'}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch();
                                }}
                            >
                                <Input placeholder='Type here...' onChange={(event) => setSearch(event.target.value)} value={search} />
                            </form>
                            <Button onClick={handleSearch} ml={2} isLoading={loading}>
                                Go
                            </Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResp.map((user: any) => {
                                return <UserListItem user={user} key={user._id} onClick={() => accessChat(user._id)} />;
                            })
                        )}
                        {chatLoading && <Spinner display={'flex'} />}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
