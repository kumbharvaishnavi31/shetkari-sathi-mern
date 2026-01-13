import mongoose from "mongoose";

const MarketSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  market: { type: String, required: true },
  min: { type: Number, required: true },
  avg: { type: Number, required: true },

  max: { type: Number, required: true },
  modal: { type: Number, required: true }, // government modal price
}, { timestamps: true });

export default mongoose.model("Market", MarketSchema);
