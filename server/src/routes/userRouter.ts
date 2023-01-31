import { Router } from 'express';
import { sendOtpForEmailVerification, validateAndUpdateOtpLogs } from '../controller/otpLogsController';
import { getUser, searchUsers, userLogin, userSignUp } from '../controller/usersController';
import { authenticatedRouter } from '../middleware/auth';
import { signUpValidation } from '../validations/users';

const userRouter = Router();

userRouter.post('/signup', signUpValidation, userSignUp);
userRouter.post('/login', userLogin);
userRouter.get('/search', authenticatedRouter, searchUsers);
userRouter.get('/', authenticatedRouter, getUser);
userRouter.route('/otp/email').put(sendOtpForEmailVerification).post(validateAndUpdateOtpLogs);

export default userRouter;
