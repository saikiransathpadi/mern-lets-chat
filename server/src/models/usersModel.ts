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
        isEmailVerified: {
            type: Boolean,
            default: false,
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

userSchema.pre('updateOne', async function (next) {
    const user: any = this;

    try {
        // only hash the password if it has been modified (or is new)
        if (!user._update.password) return next();
        user._update.password = hashPassword(user._update.password);
        next();
    } catch (error: any) {
        return next(error);
    }
});

export const User = model('User', userSchema);
