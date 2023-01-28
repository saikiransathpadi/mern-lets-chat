import mongoose from 'mongoose';

export const connectMongoDb = async () => {
    try {
        console.log('Connecting to db.....');
        mongoose.set('strictQuery', true);
        const dbResp: any = await mongoose.connect(process.env.MONGODB_URI as any, { dbName: process.env.DB_NAME, autoCreate: true, autoIndex: true });
        require('../models')
        console.log('connectd to DB', dbResp.connection.host, dbResp.connection.name);
    } catch (error) {
        console.log('Error While connecting DB', error);
    }
};
