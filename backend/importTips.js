import mongoose from "mongoose";
import fs from "fs";
import Tip from "./models/Tip.js"; // adjust path if needed

// ✅ 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/shetkarisathi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB connected");

  try {
    // ✅ 2. Read JSON file
    const data = JSON.parse(fs.readFileSync("./data/tips.json", "utf-8"));

    // ✅ 3. Clear old data (optional)
    await Tip.deleteMany();

    // ✅ 4. Insert new data
    await Tip.insertMany(data);
    console.log("🌱 Tips imported successfully!");
  } catch (error) {
    console.error("❌ Error importing tips:", error);
  } finally {
    mongoose.connection.close();
  }
});
