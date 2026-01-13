// backend/routes/orderRoutes.js
import express from "express";
const router = express.Router();

// Example routes
router.get("/", (req, res) => {
  res.json({ message: "All orders fetched" });
});

router.post("/", (req, res) => {
  res.json({ message: "Order created" });
});

export default router;
