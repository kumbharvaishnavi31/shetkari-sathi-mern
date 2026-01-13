// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import PurchaseRequest from "./models/PurchaseRequest.js"; // adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const seedRequests = async () => {
  try {
    // Delete existing data (optional)
    await PurchaseRequest.deleteMany({});

    // Insert sample data
    const requests = [
      {
        crop: "64f122abc456", // replace with actual crop _id
        buyer: "John Doe",
        farmer: "7205c423-dc1b-4111-9c1f-253d4253cb21", // replace with actual farmer userId
        quantity: 50,
        totalPrice: 5000,
        paymentMethod: "COD",
        notes: "Deliver ASAP",
        adminStatus: "Approved",
        farmerStatus: "Pending",
      },
      {
        crop: "64f122abc456",
        buyer: "Alice Smith",
        farmer: "7205c423-dc1b-4111-9c1f-253d4253cb21",
        quantity: 30,
        totalPrice: 3000,
        paymentMethod: "Online",
        notes: "Handle with care",
        adminStatus: "Approved",
        farmerStatus: "Pending",
      },
      // Add more if needed
    ];

    await PurchaseRequest.insertMany(requests);
    console.log("Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedRequests();
