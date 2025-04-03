import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model("Image", ImageSchema);
