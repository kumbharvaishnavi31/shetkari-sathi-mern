import express from "express";
import Crop from "../models/Crops.js";

const router = express.Router();

// Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get crop by ID
router.get("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new crop
router.post("/", async (req, res) => {
  try {
    const { name, type, price, quantity, tips, image, paymentMethods, farmer } = req.body;

    // 🧩 Validate that farmer is provided
    if (!farmer) {
      return res.status(400).json({ message: "Farmer ID is required" });
    }

    // ✅ Create crop with real farmer ID
    const crop = new Crop({
      name,
      type,
      price,
      quantity,
      tips,
      image,
      paymentMethods,
      farmer, // real farmer userId from frontend
      status: "Pending",
    });

    const savedCrop = await crop.save();
    res.status(201).json(savedCrop);
  } catch (err) {
    console.error("Error creating crop:", err);
    res.status(400).json({ message: err.message });
  }
});

// Approve a crop (admin action)
router.put("/approve/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    crop.status = "Approved";
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve crop" });
  }
});

// Update a crop (Edit)
router.put("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    Object.assign(crop, req.body); // update fields from req.body
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update crop" });
  }
});
// ✅ Delete a crop by ID
router.delete("/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    await crop.deleteOne();
    res.json({ message: "Crop deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get crops for a specific farmer
router.get("/farmer/:farmerId", async (req, res) => {
  try {
    const { farmerId } = req.params;
    const crops = await Crop.find({ farmer: farmerId }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch crops" });
  }
});

export default router;
