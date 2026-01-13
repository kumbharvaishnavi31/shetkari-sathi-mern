
import express from "express";
import Tip from "../models/Tip.js";

const router = express.Router();

// ➕ Create Tip
router.post("/", async (req, res) => {
  try {
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (err) {
    console.error("Error saving tip:", err.message);
    res.status(500).json({ message: err.message || "Failed to save tip" });
  }
});

// 📋 Get all Tips
router.get("/", async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    console.error("Error fetching tips:", err.message);
    res.status(500).json({ message: err.message || "Failed to fetch tips" });
  }
});

// ✏️ Update Tip
router.put("/:id", async (req, res) => {
  try {
    const updatedTip = await Tip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    res.json(updatedTip);
  } catch (err) {
    console.error("Error updating tip:", err.message);
    res.status(500).json({ message: err.message || "Failed to update tip" });
  }
});

// 🗑️ Delete Tip
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tip.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Tip not found" });
    }
    res.json({ message: "Tip deleted successfully" });
  } catch (err) {
    console.error("Error deleting tip:", err.message);
    res.status(500).json({ message: err.message || "Failed to delete tip" });
  }
});

export default router;
