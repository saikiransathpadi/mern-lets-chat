import { Box } from "@chakra-ui/react";
import { ChatContextState } from "../../context/ChatProvider";
import { SingleChat } from "./SingleChat";

export const ChatBox = () => {
    const {selectedChat}: any = ChatContextState();
    return (
        <Box
            display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
            alignItems='center'
            flexDir='column'
            width={{ base: '100%', md: '72.7%' }}
            borderRadius='lg'
            borderWidth={'1px'}
            bg='white'
            p={3}
        > <SingleChat/></Box>
    );
};
