import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

export const UserProfileModal = ({ user, children, admin }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {children ? <span onClick={onOpen}>{children}</span> : <></>}
            <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} fontSize='2xl' fontFamily={'Work sans'} justifyContent='center'>
                        {user.name}{' '}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} justifyContent='center' flexDir={'column'} alignItems='center'>
                        <Image borderRadius='lg' boxSize='150px' src={user.profilePic} alt={user.name} my={5} />
                        <Text fontSize={'2xl'} pt={5}>
                            <b>Email:{' '}</b>{user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {/* TODO Update Profile */}
                        {admin && <Button variant='ghost'>Submit</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
