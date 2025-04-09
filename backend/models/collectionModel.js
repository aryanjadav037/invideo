import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }]
}, { timestamps: true });

export default mongoose.model("Collections", CollectionSchema);