import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  tips: { type: String },


  image: { type: String, required: true }, // store Base64 or image URL
  paymentMethods: [{ type: String, required: true }],
  farmer: { type: String,   ref: "User",required: true }, // can be user ID from auth
  status: { type: String, default: "Pending" }, // for admin approval
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
