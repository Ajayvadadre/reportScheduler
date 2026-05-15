import { MongoClient } from 'mongodb';
import 'dotenv/config';

class MongoConnection {

    constructor() {

        this.client = null;
        this.db     = null;
    }

    async startMongoDb() {
        try {
            const uri = process.env.MONGO_URI;
            const database = process.env.MONGO_DATABASE;
            
            this.client = new MongoClient(uri, {
                maxPoolSize: 10,
            });

            await this.client.connect();

            this.db = this.client.db(database);
            console.log('log ::: Connected to mongoDB')

        } catch (error) {
            console.log('error ::: Connection to mongoDB failed', error);
            throw error;
        }
    };

    getDb() {
        if (!this.db) {
            throw new Error('Call Connect first!')
        }
        return this.db
    };

    async disconnect() {
        if (this.client) {
            await this.client.close();
        }
        console.log('log ::: mongo connection closed');
    }
};

export default new MongoConnection()