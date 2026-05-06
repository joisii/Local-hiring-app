import express from "express";
import { createJob } from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only clients can post jobs
router.post("/", protect, authorizeRoles("client"), createJob);

export default router;