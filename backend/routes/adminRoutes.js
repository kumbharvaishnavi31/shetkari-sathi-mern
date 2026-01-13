import express from "express";
import User from "../models/User.js";
import Crop from "../models/Crops.js";
import PurchaseRequest from "../models/PurchaseRequest.js";
import Market from "../models/Market.js";

const router = express.Router();

/* =============================
   📊 ADMIN DASHBOARD STATS
   ============================= */
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCrops = await Crop.countDocuments();
    const totalRequests = await PurchaseRequest.countDocuments();

    res.json({
      users: totalUsers,
      crops: totalCrops,
      requests: totalRequests,
      transactions: 0, // Removed transaction aggregation
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =============================
   💹 MARKET PRICE ROUTES
   ============================= */
router.get("/market", async (req, res) => {
  try {
    const marketPrices = await Market.find().sort({ createdAt: -1 });
    res.json(marketPrices);
  } catch (err) {
    console.error("Error fetching market prices:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/market", async (req, res) => {
  try {
    const newMarket = new Market(req.body);
    await newMarket.save();
    res.status(201).json(newMarket);
  } catch (err) {
    console.error("Error adding market price:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   🌾 CROP MANAGEMENT
   ============================= */
router.get("/crops", async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmer", "name email");
    res.json(crops);
  } catch (err) {
    console.error("Error fetching crops:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =============================
   👤 USER MANAGEMENT
   ============================= */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
