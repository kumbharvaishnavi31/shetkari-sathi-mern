import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; 
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: () => uuidv4(), // generates a unique random ID
    unique: true,
  },

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  aadhaar: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["farmer", "buyer","admin"], required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
