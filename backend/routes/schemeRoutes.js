import express from "express";
import Scheme from "../models/Scheme.js";

const router = express.Router();

// ➕ Create Scheme
router.post("/", async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (err) {
    console.error("Error saving scheme:", err.message);
    res.status(500).json({ message: err.message || "Failed to save scheme" });
  }
});

// 📋 Get All Schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    console.error("Error fetching schemes:", err.message);
    res.status(500).json({ message: err.message || "Failed to fetch schemes" });
  }
});

// ✏️ Update Scheme
router.put("/:id", async (req, res) => {
  try {
    const updatedScheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedScheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }

    res.json(updatedScheme);
  } catch (err) {
    console.error("Error updating scheme:", err.message);
    res.status(500).json({ message: err.message || "Failed to update scheme" });
  }
});

// 🗑️ Delete Scheme
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Scheme.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json({ message: "Scheme deleted successfully" });
  } catch (err) {
    console.error("Error deleting scheme:", err.message);
    res.status(500).json({ message: err.message || "Failed to delete scheme" });
  }
});

export default router;
