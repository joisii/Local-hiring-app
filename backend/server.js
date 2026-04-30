import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registerRoutes from "./Routes/registerRoutes.js";


dotenv.config();

const server = express();

// Middleware
server.use(express.json());

// Routes
server.use("/api/auth", registerRoutes);

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