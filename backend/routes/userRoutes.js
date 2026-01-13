import express from "express";
import User from "../models/User.js";
const router = express.Router();

// ✅ Get user by _id
router.get("/id/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // ✅ using _id
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update user by _id
router.put("/id/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// In userRoutes.js
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
