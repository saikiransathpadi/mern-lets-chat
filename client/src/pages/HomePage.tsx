import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { SignUp } from '../components/auth/SignUp';

export const HomePage = ({pageTabIndex}: any) => {
    const [tabIndex, setTabIndex] = useState(pageTabIndex || 0);
    const navigate = useNavigate()
    const handleTabChange = (index: number) => {
        setTabIndex(index)
        if (index === 0) navigate('/login')
        if (index === 1) navigate('/signup')
    }

    useEffect(() => {
        if (window.sessionStorage.getItem('user_token') && tabIndex !== 1) {
            navigate('/chats')
        }
    }, [navigate, tabIndex])
    return (
        <Container maxW='xl' centerContent>
            <Box
                display='flex'
                justifyContent={'center'}
                p={3}
                bg={'white'}
                w='100%'
                m='40px 0 15px 0'
                borderRadius={'lg'}
                borderWidth='1px'
            >
                <Text fontSize={'3xl'}>Let's Chat</Text>
            </Box>
            <Box w='100%' borderRadius={'lg'} borderWidth='1px' p={3} bg={'white'}>
                <Tabs isFitted variant='soft-rounded' index={tabIndex} onChange={handleTabChange} isLazy>
                    <TabList mb='1em'>
                        <Tab>Login</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Login handleTabChange={handleTabChange} />
                        </TabPanel>
                        <TabPanel>
                            <SignUp handleTabChange={handleTabChange}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};
