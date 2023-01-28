import { Request, Response } from 'express';
import { createUserDb, getUserByEmail, searchUsersDb } from '../db/dal/usersDal';
import { IExpressReqWithUser } from '../interface/request';
import { generateJwtToken } from '../middleware/auth';
import { comparePassword } from '../middleware/security';

export const getChats = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        return res.status(200).json({
            result: [],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: [],
        });
    }
};

export const userSignUp = async (req: Request, res: Response) => {
    try {
        if (await getUserByEmail(req.body.email)) {
            throw new Error('User already exists, Please Login');
        }
        const dbResp = await createUserDb(req.body);

        return res.status(200).json({
            result: {
                name: dbResp.name,
                email: dbResp.email,
                profilePic: dbResp.profilePic,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const userData: any = await getUserByEmail(req.body.email);
        if (!userData) {
            throw new Error("User doesn't exist, please signUp");
        }
        if (!comparePassword(req.body.password, userData?.password)) {
            throw new Error('Incorrect Password');
        }
        return res.status(200).json({
            result: {
                token: await generateJwtToken({ email: userData.email, id: userData._id }),
                email: userData.email,
                name: userData.name,
                profilePic: userData.profilePic,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const searchUsers = async (req: IExpressReqWithUser, res: Response) => {
    try {
        const query = req.query;
        const users = await searchUsersDb(query, req.user);
        return res.status(200).json({
            result: {
                users,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};

export const getUser = async (req: IExpressReqWithUser, res: Response) => {
    try {
        const email: any = req?.user?.email;
        const user = await getUserByEmail(email);
        return res.status(200).json({
            result: {
                user,
            },
            message: 'Success',
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            error,
            message: error.message,
        });
    }
};
