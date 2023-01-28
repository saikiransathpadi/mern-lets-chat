import { CloseIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';

export const UserBadgeItem = ({ user, onClick = () => {} }: { user: any; onClick?: any }) => {
    return (
        <Box bg={'#92d8bae8'} display='flex' alignItems='center' p={1.5} borderRadius='lg' color='black' m={2} >
            <Text fontWeight={'bold'}>{user.name}</Text>
            <CloseIcon onClick={onClick} boxSize={4} pl={1} cursor='pointer'/>
        </Box>
    );
};
