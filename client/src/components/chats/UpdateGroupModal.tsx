import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { ChatContextState } from '../../context/ChatProvider';
import { chatService } from '../../service/chatService';
import { userService } from '../../service/usersService';
import { UserBadgeItem } from '../user/UserBadgeItem';
import { UserListItem } from '../user/UserListItem';
import { ChatLoading } from './ChatLoading';

export const UpdateGroupModal = ({ children }: any) => {
    const { callUserChats, selectedChat, chats, userData }: any = ChatContextState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        setGroupChatName((selectedChat || {}).chatName);
        setSelectedUsers((selectedChat || {}).users);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, chats]);


    const handleSearch = async (searchVal: string) => {
        if (!searchVal) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        const resp = await userService.searchUsers({
            name: searchVal,
            limit: 5,
        });
        setSearchResult(resp.data.result.users);
        setLoading(false);
    };

    const isValidGroup = () => {
        const tempFromErrors = { ...formErrors };
        let isValid = true;
        if (selectedUsers.length < 2) isValid = false;
        if (!groupChatName) isValid = false;
        tempFromErrors['users'] = selectedUsers.length < 2;
        tempFromErrors['chatname'] = !groupChatName;
        setFormErrors(tempFromErrors);
        return isValid;
    };

    const handleUpdateGroup = async () => {
        if (!isValidGroup()) return;

        const resp: any = await chatService.updateGroupChat(
            {
                chatName: groupChatName,
                users: selectedUsers.map((user) => user._id),
            },
            selectedChat._id
        );
        if (resp.status === 200) {
            toast({
                position: 'top',
                title: 'Group Updated Successfully',
                status: 'success',
            });

            await callUserChats(true);
            modalClose();
        } else {
            toast({
                position: 'top',
                title: get(resp, 'response.data.message', 'Something went Wrong'),
                status: 'error',
            });
        }
    };

    const handleAddGroup = (user: any) => {
        if (selectedUsers.find((i) => i._id === user._id)) return;
        setSelectedUsers([...selectedUsers, user]);
    };
    const handleDeleteGroup = (user: any) => {
        setSelectedUsers([...selectedUsers.filter((i) => i._id !== user._id)]);
    };

    const modalClose = () => {
        setFormErrors({});
        setSearchResult([]);
        onClose();
    };

    return (
        <>
            {children ? <span onClick={onOpen}>{children}</span> : <></>}
            <Modal isOpen={isOpen} onClose={modalClose} size='lg' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} fontSize='2xl' fontFamily={'Work sans'} justifyContent='center'>
                        {(selectedChat || {}).chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} justifyContent='center' flexDir={'column'} alignItems='center'>
                        <FormControl isInvalid={formErrors.users}>
                            <Input
                                placeholder='Chat Name...'
                                onChange={(e: any) => {
                                    setGroupChatName(e.target.value);
                                }}
                                value={groupChatName}
                                mb={3}
                            />
                        </FormControl>
                        <Box display={'flex'} flexWrap='wrap'>
                            {(selectedUsers.filter(i => i._id !== userData._id)).map((i: any) => (
                                <UserBadgeItem user={i} onClick={() => handleDeleteGroup(i)} key={i._id} />
                            ))}
                        </Box>
                        <FormControl isInvalid={formErrors.users}>
                            <Input placeholder='Add Users eg: John, Alan etc..' onChange={(e: any) => handleSearch(e.target.value)} />
                            <FormErrorMessage>Atleast 2 participants are required to in a group.</FormErrorMessage>
                        </FormControl>
                        {loading ? (
                            <ChatLoading count={3} />
                        ) : (
                            searchResult.map((user: any) => (
                                <UserListItem user={user} onClick={() => handleAddGroup(user)} key={user._id} />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdateGroup}>
                            Update Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
