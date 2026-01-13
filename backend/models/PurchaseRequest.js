// import mongoose from "mongoose";

// const purchaseRequestSchema = new mongoose.Schema({
//   crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop" },
//   // buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   farmer: { type: String, ref: "User" }, // store farmer's userId
//   buyer: { type: String}, // 👈 change to String
//   quantity: Number,
//   totalPrice: Number,
//   paymentMethod: String,
//   notes: String,
//   adminStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
//   farmerStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("PurchaseRequest", purchaseRequestSchema);
import mongoose from "mongoose";

const purchaseRequestSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
  farmer: { type: String, ref: "User" },  // store farmer's userId as string
  buyer: { type: String },                // buyer's userId as string
  quantity: { type: Number, required: true },
  totalPrice: Number,
  paymentMethod: String,
  notes: String,
  adminStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  farmerStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PurchaseRequest", purchaseRequestSchema);
