import express from 'express';
import 'dotenv/config';
import schedulerRoutes from '../routes/schedulerRoutes'

const app = express();
const {
    PORT = 3000
} = process.env

app.use("/schedule",schedulerRoutes)

app.listen(PORT, () => {
    console.log("server listening on port:::", PORT)
})