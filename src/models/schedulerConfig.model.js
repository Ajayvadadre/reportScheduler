import mongoose from "mongoose";

const schedulerConfigSchema = mongoose.Schema(
    {
        type: { type: String },
        time: { type: String },
        id: { type: String },
        name: { type: String },
        date: { type: Object, default: false }
    }
);

export default mongoose.model("schedulerConfig", schedulerConfigSchema)