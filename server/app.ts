require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { connectMongoDb } from './src/db/mongoose';
import router from './src/routes';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => [res.send('working')]);

app.use('/chatapp/api/v1', router);

app.use('*', (_req, res) => {
    res.status(404).json({ message: 'route not found' });
});

const server = app.listen(process.env.PORT, async () => {
    await connectMongoDb();
    console.log('listening on port:', process.env.PORT);
});

const io = new Server(server, { cors: { origin: '*' }, pingTimeout: 60000 });
io.on('connection', (socket) => {
    console.log('connected to socket io', socket.id);
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log('socket connection for user', userData._id);

        socket.emit('connected');
    });
    socket.on('join_chat', (roomId) => {
        socket.join(roomId);
        console.log('user joined room', roomId);
    });

    socket.on('typing', (room) => {
        console.log('typingg', room);
        socket.in(room).emit('typing')
    })
    socket.on('stop_typing', (room) => {
        console.log('stop typingg', room);
        socket.in(room).emit('stop_typing')
    })

    socket.on('new_message', (newMessage: any) => {
        var chat = newMessage.chat;
        console.log('new message received', JSON.stringify(newMessage));
        
        if (!chat.users) {
            console.log('no users for his chat');
        }
        chat.users.forEach((user: any) => {
            if (user._id == newMessage.sender._id) return;
            socket.in(user._id).emit('messaged_received', newMessage);
        });
    });

    // socket.off('setup', () => {
    //     socket.leave(userdata)
    // })
});
