import { Avatar, Text, Tooltip } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage } from '../../common/utils';
import { ChatContextState } from '../../context/ChatProvider';

export const ScrollableChat = ({ messages }: any) => {
    const {
        userData: { _id: userId },
    }: any = ChatContextState();
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((eachMessage: any, index: number) => {
                    return (
                        <div style={{ textAlign: 'right', display: 'flex' }} key={eachMessage._id}>
                            {!(eachMessage.sender._id === userId) && isLastMessage({ messages, index, userId }) && (
                                <Tooltip label={eachMessage.sender.name} placement='bottom-start' hasArrow>
                                    <Avatar
                                        mt={3}
                                        mr={1}
                                        size='sm'
                                        cursor={'pointer'}
                                        name={eachMessage.sender.name}
                                        src={eachMessage.sender.profilePic}
                                        visibility={`${isLastMessage({ messages, index, userId }) ? 'visible' : 'hidden'}`}
                                    />
                                </Tooltip>
                            )}
                            <Text
                                bg={`${eachMessage.sender._id === userId ? '#BEE3F8' : '#B9F5D0'}`}
                                borderRadius='20px'
                                p='5px 15px'
                                mt={3}
                                maxW='100%'
                                ml={{
                                    base: `${
                                        eachMessage.sender._id === userId
                                            ? 'auto'
                                            : `${isLastMessage({ messages, index, userId }) ? '' : '10%'}`
                                    }`,
                                    md: `${
                                        eachMessage.sender._id === userId
                                            ? 'auto'
                                            : `${isLastMessage({ messages, index, userId }) ? '' : '3%'}`
                                    }`,
                                }}
                            >
                                {eachMessage.content}
                            </Text>
                        </div>
                    );
                })}
        </ScrollableFeed>
    );
};
