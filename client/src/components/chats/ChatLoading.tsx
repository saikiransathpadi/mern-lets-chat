import { Skeleton, Stack } from '@chakra-ui/react';

export const ChatLoading = ({ count = 10 }) => {
    return (
        <>
            <Stack mt={5}>
                {Array.from({ length: count }).map((_i, j) => (
                    <Skeleton height='40px' key={j}/>
                ))}
            </Stack>
        </>
    );
};
