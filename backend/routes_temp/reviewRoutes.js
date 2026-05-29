import express from "express";
import { createReview , getWorkerReviews , getReviewByJob} from "../controllers/reviewController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:jobId",
  protect,
  authorizeRoles("client"),
  createReview
);

// get worker reviews
router.get("/worker/:workerId", getWorkerReviews);

router.get("/job/:jobId", getReviewByJob);

export default router;