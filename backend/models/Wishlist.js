import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  buyer: { type: String, required: true }, // UUID of user
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
