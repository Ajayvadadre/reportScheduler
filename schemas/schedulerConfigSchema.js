import mongoose from "mongoose";

const schedulerConfigSchema = mongoose.Schema(
    {
        type: { type: String },
        scheduleTime: { type: String },
        id: { type: String }
    }
);

export default mongoose.model("schedulerConfig", schedulerConfigSchema)