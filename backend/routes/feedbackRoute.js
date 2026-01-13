import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST new feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save feedback." });
  }
});

// GET all feedbacks (optional)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
});

export default router;
