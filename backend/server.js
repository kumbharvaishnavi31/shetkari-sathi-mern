import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import marketRoutes from "./routes/marketRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import cropRoutes from "./routes/cropRoutes.js"; 
import purchaseRequestsRouter from "./routes/purchaseRequests.js";
import wishlistRoutes from "./routes/wishlist.js";
import schemeRoutes from "./routes/schemeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/tips",tipRoutes);
app.use("/api/crops", cropRoutes); 
app.use("/api/purchase_requests", purchaseRequestsRouter);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/feedback", feedbackRoute);
app.use("/api/users",userRoutes);
app.use("/api/admin", adminRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
