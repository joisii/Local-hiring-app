import express from "express";
import { createJob } from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getJobs, acceptJob } from "../controllers/jobController.js";

const router = express.Router();

// Only clients can post jobs
router.post("/", protect, authorizeRoles("client"), createJob);

// Workers can view jobs
router.get("/", protect, authorizeRoles("worker"), getJobs);

// Workers accept job
router.put("/:id/accept", protect, authorizeRoles("worker"), acceptJob);

export default router;