import { ChakraProvider, theme } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/ChatPage';
import { HomePage } from './pages/HomePage';
import './App.css';

export const App = () => (
    <ChakraProvider theme={theme}>
        <div className='App'>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/chats' element={<ChatPage />} />
            <Route path='/signup' element={<HomePage pageTabIndex={1}/>} />
            <Route path='/login' element={<HomePage pageTabIndex={0}/>} />
            <Route path='*' element={<HomePage />} />
        </Routes>
        </div>
    </ChakraProvider>
);
