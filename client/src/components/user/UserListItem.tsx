import { Avatar, Box, Text } from '@chakra-ui/react';

export const UserListItem = ({ user, onClick = () => {} }: { user: any; onClick?: any }) => {
    return (
        <Box
            onClick={onClick}
            cursor='pointer'
            bg={'#e7ebece8'}
            _hover={{
                bg: '#5fa5b6e8',
            }}
            display='flex'
            alignItems='center'
            m={2}
            p={3}
            borderRadius='lg'
            width={'100%'}
        >
            <Avatar src={user.profilePic} name={user.name} size='sm' mr={2} />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize={'xs'}><span  style={{fontWeight:'bold'}}>Email:</span> {user.email}</Text>
            </Box>
        </Box>
    );
};
