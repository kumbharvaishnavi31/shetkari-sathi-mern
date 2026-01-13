import express from "express";
import mongoose from "mongoose";
import PurchaseRequest from "../models/PurchaseRequest.js";
import Crop from "../models/Crops.js";

const router = express.Router();

// =================== CREATE PURCHASE REQUEST ===================
router.post("/", async (req, res) => {
  try {
    const newRequest = new PurchaseRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Request Sent", data: newRequest });
  } catch (err) {
    console.error("Purchase request error:", err);
    res.status(500).json({ message: "Failed to send request", error: err.message });
  }
});

// =================== GET BUYER REQUESTS ===================
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    const requests = await PurchaseRequest.find({ buyer: req.params.buyerId })
      .populate({ path: "crop", select: "name price" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================== GET ALL REQUESTS (ADMIN) ===================
router.get("/admin", async (req, res) => {
  try {
    const requests = await PurchaseRequest.find()
      .populate({ path: "crop", select: "name price farmer" })
      .populate({ path: "buyer", select: "name email" });
    res.json(requests);
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// =================== ADMIN APPROVE/REJECT ===================
router.put("/admin/:id", async (req, res) => {
  try {
    const { adminStatus } = req.body;

    // Fetch the purchase request with crop info
    const request = await PurchaseRequest.findById(req.params.id).populate("crop");

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (!request.crop || !request.crop.farmer)
      return res.status(400).json({ message: "Crop or crop's farmer not found" });

    // Assign the correct farmer from the crop automatically
    request.adminStatus = adminStatus;           // Approved / Rejected
    request.farmer = request.crop.farmer;       // assign real farmer userId
    request.farmerStatus = "Pending";           // reset for farmer
    await request.save();

    res.json(request);
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ error: err.message });
  }
});


// =================== GET FARMER REQUESTS (PENDING & APPROVED BY ADMIN) ===================
router.get("/farmer/:farmerId", async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

    const requests = await PurchaseRequest.find({
      farmer: farmerId,
      adminStatus: "Approved",
      farmerStatus: "Pending",
    })
      .populate({ path: "crop", select: "name price" })
      .populate({ path: "buyer", select: "name email" });

    res.json(requests);
  } catch (err) {
    console.error("Failed to fetch requests for farmer:", err);
    res.status(500).json({ error: err.message });
  }
});

// =================== FARMER APPROVE/REJECT ===================
router.put("/farmer/:id", async (req, res) => {
  try {
    const { farmerStatus } = req.body;

    const request = await PurchaseRequest.findByIdAndUpdate(
      req.params.id,
      { farmerStatus },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (err) {
    console.error("Failed to update request by farmer:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all purchase requests for a specific buyer
router.get("/", async (req, res) => {
  try {
    const { buyerId } = req.query;
    if (!buyerId) return res.status(400).json({ message: "Buyer ID required" });

    const requests = await PurchaseRequest.find({ buyer: buyerId })
      .populate({
        path: "crop",
        populate: { path: "farmer"}, // ✅ get farmer's name & phone
        select: "name farmer",
      })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Error fetching buyer requests:", err);
    res.status(500).json({ message: err.message });
  }
});
// Get all approved orders for a buyer
router.get("/buyer/:buyerId/orders", async (req, res) => {
  try {
    const buyerId = req.params.buyerId;

    // Only approved by both admin and farmer
    const orders = await PurchaseRequest.find({
      buyer: buyerId,
      adminStatus: "Approved",
      farmerStatus: "Approved",
    })
      .populate({ path: "crop", select: "name price" })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Failed to fetch approved orders:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
