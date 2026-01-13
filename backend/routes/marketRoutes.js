
import express from "express";
import Market from "../models/Market.js";

const router = express.Router();

// ➕ POST: Save new market price
router.post("/", async (req, res) => {
  try {
    const market = new Market(req.body);
    await market.save();
    res.status(201).json(market);
  } catch (err) {
    console.error("Error saving market data:", err.message);
    res.status(500).json({ message: err.message || "Failed to save market data" });
  }
});

// 📋 GET: Fetch all market prices
router.get("/", async (req, res) => {
  try {
    const markets = await Market.find();
    res.json(markets);
  } catch (err) {
    console.error("Error fetching market data:", err.message);
    res.status(500).json({ message: err.message || "Failed to fetch market data" });
  }
});

// ✏️ PUT: Update market price
router.put("/:id", async (req, res) => {
  try {
    const updatedMarket = await Market.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMarket) {
      return res.status(404).json({ message: "Market record not found" });
    }

    res.json(updatedMarket);
  } catch (err) {
    console.error("Error updating market data:", err.message);
    res.status(500).json({ message: err.message || "Failed to update market data" });
  }
});

// 🗑️ DELETE: Delete market price
router.delete("/:id", async (req, res) => {
  try {
    const market = await Market.findByIdAndDelete(req.params.id);
    if (!market) {
      return res.status(404).json({ message: "Market record not found" });
    }
    res.json({ message: "Market data deleted successfully" });
  } catch (err) {
    console.error("Error deleting market data:", err.message);
    res.status(500).json({ message: err.message || "Failed to delete market data" });
  }
});

export default router;
