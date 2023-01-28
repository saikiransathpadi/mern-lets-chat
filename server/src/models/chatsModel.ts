import { model, Schema } from 'mongoose';

const chatSchema = new Schema(
    {
        chatName: {
            type: String,
            trim: true,
            required: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
            required: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },

        groupAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export const Chat = model('Chat', chatSchema);
