import express from 'express';
import 'dotenv/config';
import schedulerRoutes from './routes/scheduler.route.js';
import MongoConnection from './database/mongoConnection.js';

const app = express();
const {
    PORT = 3000
} = process.env

app.use(express.json());
app.use("/schedule", schedulerRoutes)

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