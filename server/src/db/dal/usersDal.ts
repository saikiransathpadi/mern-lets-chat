import { STATUS_CODES } from '../../enums';
import { ServiceException } from '../../errors/errorsHandlers';
import { dbRes } from '../../interfaces';
import { User } from '../../models/usersModel';

export const createUserDb = async (body: { [key: string]: any }) => {
    try {
        const resp = await User.create(body);
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserByQueryDb = async (filterQuery: { [key: string]: any }) => {
    try {
        const resp = await User.find(filterQuery);
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const resp = await User.findOne({ email });
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const searchUsersDb = async (query: any, user: any) => {
    try {
        console.log(query);
        const mongoQuery: any = {
            _id: { $ne: user.id },
        };
        if (query.name) {
            mongoQuery['$or'] = [{ name: { $regex: query.name, $options: 'i' } }, { email: { $regex: query.name, $options: 'i' } }];
        }
        const resp = await User.find(mongoQuery,{password: 0}).limit(query.limit || 10);
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUserByQueryDb = async (body: { [key: string]: any }, query: { [key: string]: any }): Promise<dbRes> => {
    const defaultResp: dbRes = {
        result: null,
    };
    try {
        delete body.password;
        if (body.email) {
            body.isEmailVerified = false;
        }
        const resp: any = await User.updateOne(query, body);
        defaultResp.result = resp;
    } catch (err: any) {
        console.log(JSON.parse(JSON.stringify(err)), err.stack);
        throw new ServiceException(STATUS_CODES.BAD_REQUEST, err.message, err);
    }
    return defaultResp;
};
