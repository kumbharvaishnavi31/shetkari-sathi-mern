import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  crops: [
    {
      crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
      quantity: Number,
    },
  ],
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
