import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registerRoutes from "./routes/registerRoutes.js";
import cookieParser from "cookie-parser";
import { protect, authorizeRoles } from "./middleware/authMiddleware.js";
import profileRoutes from "./routes/userRoutes.js";
import workerRoutes from "./routes/workerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

/* ===============================
   GLOBAL ERROR HANDLERS (TOP LEVEL)
   =============================== */

// Catch unexpected crashes
process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

// Catch async promise failures
process.on("unhandledRejection", (err) => {
  console.error("🔥 UNHANDLED REJECTION:", err);
});

/* ===============================
   ENV CONFIG
   =============================== */

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/* ===============================
   APP INIT
   =============================== */

const server = express();

/* ===============================
   MIDDLEWARE
   =============================== */
server.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Local Hiring App API",
    version: "1.0.0",
    message: "Server is live and operational"
  });
});
server.use(express.json());

server.use(
  cors({
    origin: "https://local-hiring-app.vercel.app/",
    credentials: true,
  })
);

server.use(cookieParser());

/* ===============================
   ROUTES
   =============================== */

server.use("/api/auth", registerRoutes);

server.get("/api/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed protected route",
    user: req.user,
  });
});

server.use("/api/jobs", jobRoutes);

server.get(
  "/api/client-only",
  protect,
  authorizeRoles("client"),
  (req, res) => {
    res.json({
      success: true,
      message: "Client access granted",
    });
  }
);

server.use("/api/reviews", reviewRoutes);
server.use("/api/workers", workerRoutes);
server.use("/api/profile", profileRoutes);
server.use("/api/users", userRoutes);

/* ===============================
   DATABASE CONNECTION
   =============================== */

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

/* ===============================
   START SERVER
   =============================== */

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});