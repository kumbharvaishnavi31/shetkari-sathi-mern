// import mongoose from "mongoose";

// const schemeSchema = new mongoose.Schema({
//   name: String,
//   startDate: String,
//   endDate: String,
//   benefits: String,
//   documents: String,
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Scheme", schemeSchema);
import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  benefits: String,
  documents: String,
  startDate: String,
  endDate: String,
}, { timestamps: true });

export default mongoose.model("Scheme", schemeSchema);
