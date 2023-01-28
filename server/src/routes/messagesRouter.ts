import { Router } from 'express';
import { getChatMessages, sendMessage } from '../controller/messageController';
import { authenticatedRouter } from '../middleware/auth';

const messageRouter = Router();

messageRouter.post('/', authenticatedRouter, sendMessage);
messageRouter.get('/chat/:chatId', authenticatedRouter, getChatMessages);
// messageRouter.put('/group/update/:chatId', authenticatedRouter, updateGroupChat)

export default messageRouter;
