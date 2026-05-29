import express from "express";
import {
  getMyProfile,
  updateWorkerProfile
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/worker-profile", protect, updateWorkerProfile);

export default router;