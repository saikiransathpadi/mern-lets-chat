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
