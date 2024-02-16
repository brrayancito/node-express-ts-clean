import mongoose from "mongoose";

interface Options {
    mongodbUrl: string,
    dbName: string,
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { mongodbUrl, dbName } = options;

        try {

            await mongoose.connect(mongodbUrl, { dbName: dbName });
            console.log("Mongo database connected!");
            return true;

        } catch (error) {
            console.log("Mongo database connection error!");
            throw error;
        }
    }
}