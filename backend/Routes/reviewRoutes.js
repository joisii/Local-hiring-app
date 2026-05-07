import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  authorizeRoles("client"),
  createReview
);

export default router;