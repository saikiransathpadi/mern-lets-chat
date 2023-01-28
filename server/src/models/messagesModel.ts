import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
    {
        content: {
            type: String,
            trim: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
    },
    { timestamps: true }
);

export const Message = model('Message', messageSchema);
