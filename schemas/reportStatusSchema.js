import mongoose from "mongoose";

const reportStatusSchema = mongoose.Schema(
    {
        type: { type: String },
        scheduleTime: { type: String },
        status: { type: String },

    }
);

export default mongoose.model('reportStatus', reportStatusSchema)