import express from 'express';
import 'dotenv/config';
import schedulerRoutes from '../routes/schedulerRoutes.js';
import MongoConnection from '../connection/mongoConnection.js';

const app = express();
const {
    PORT = 3000
} = process.env

app.use("/schedule", schedulerRoutes)
app.use(express.json());

async function startServer() {

    try {

        await MongoConnection.startMongoDb();
        console.log('log ::: Mongo connection established');

        app.listen(PORT, () => {
            console.log("server listening on port:::", PORT);
        });

    } catch (error) {
        console.log('error ::: MongoDB connection error', error)
    }
};

startServer();