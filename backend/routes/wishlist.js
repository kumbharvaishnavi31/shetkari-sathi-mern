import express from "express";
import Wishlist from "../models/Wishlist.js"; // You need a Wishlist model
import User from "../models/User.js";
import Crop from "../models/Crops.js";

const router = express.Router();

// ===== Get wishlist for a buyer =====
router.get("/:buyerId", async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    const wishlist = await Wishlist.find({ buyer: buyerId }).populate("crop");
    res.json(wishlist.map((w) => w.crop));
  } catch (err) {
    console.error("Failed to fetch wishlist:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===== Add crop to wishlist =====
router.post("/:buyerId", async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    const { crop } = req.body;

    if (!crop) return res.status(400).json({ message: "Crop ID required" });

    // Check if already exists
    const exists = await Wishlist.findOne({ buyer: buyerId, crop });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const newItem = new Wishlist({ buyer: buyerId, crop });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Failed to add wishlist item:", err);
    res.status(500).json({ message: err.message });
  }
});

// ===== Remove crop from wishlist =====
router.delete("/:buyerId/:cropId", async (req, res) => {
  try {
    const { buyerId, cropId } = req.params;
    const removed = await Wishlist.findOneAndDelete({ buyer: buyerId, crop: cropId });
    if (!removed) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Failed to remove wishlist item:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
