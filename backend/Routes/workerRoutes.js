import express from "express";
import { getWorkers } from "../controllers/workerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in users can view workers
router.get("/", protect, getWorkers);

export default router;