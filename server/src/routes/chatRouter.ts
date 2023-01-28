import { Router } from 'express';
import { accessChat, createGroupChat, getUserChats, updateGroupChat } from '../controller/chatsController';
import { authenticatedRouter } from '../middleware/auth';

const chatRouter = Router();

chatRouter.get('/', authenticatedRouter, getUserChats);
chatRouter.post('/:userId', authenticatedRouter, accessChat);
chatRouter.post('/group/create', authenticatedRouter, createGroupChat)
chatRouter.put('/group/update/:chatId', authenticatedRouter, updateGroupChat)

export default chatRouter;
