import { model, Schema } from 'mongoose';
import { hashPassword } from '../middleware/security';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
            default: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.password = hashPassword(user.password);
    next();
});

export const User = model('User', userSchema);
