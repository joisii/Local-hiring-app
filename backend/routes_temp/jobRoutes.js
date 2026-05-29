import express from "express";
import {
  createJob,
  getJobs,
  acceptJob,
  updateJobStatus
} from "../controllers/jobController.js";
import {
  getWorkerJobs,
  getClientJobs
} from "../controllers/jobController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only clients can post jobs
router.post("/", protect, authorizeRoles("client"), createJob);

// Workers can view jobs
router.get("/", protect, authorizeRoles("worker"), getJobs);

// Workers accept job
router.put("/:id/accept", protect, authorizeRoles("worker"), acceptJob);

router.put(
  "/:id/status",
  protect,
  authorizeRoles("worker"),
  updateJobStatus
);

// Worker dashboard
router.get(
  "/worker/my-jobs",
  protect,
  authorizeRoles("worker"),
  getWorkerJobs
);

// Client dashboard
router.get(
  "/client/my-jobs",
  protect,
  authorizeRoles("client"),
  getClientJobs
);

export default router;