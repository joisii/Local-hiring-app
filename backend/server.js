import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registerRoutes from "./routes/registerRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { authorizeRoles } from "./middleware/authMiddleware.js";
import profileRoutes from "./Routes/userRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const server = express();

// Middleware
server.use(express.json());

server.use(cors());

// Routes
server.use("/api/auth", registerRoutes);
server.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed protected route",
    user: req.user
  });
});
server.use("/api/jobs", jobRoutes);
server.get("/api/client-only", protect, authorizeRoles("client"), (req, res) => {
  res.json({
    success: true,
    message: "Client access granted"
  });
});
server.use("/api/reviews", reviewRoutes);
server.use("/api/workers", workerRoutes);
server.use("/api/profile", profileRoutes);
server.use("/api/users", userRoutes);

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Port
const PORT = process.env.PORT || 5000;

// Start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});