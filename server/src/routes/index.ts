import { Router } from 'express';
import chatRouter from './chatRouter';
import messageRouter from './messagesRouter';
import userRouter from './userRouter';

const router = Router();

const allRoutes = [
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/chat',
        route: chatRouter,
    },
    {
        path: '/message',
        route: messageRouter,
    },
];

allRoutes.forEach((eachRoute) => {
    router.use(eachRoute.path, eachRoute.route);
});

export default router;
