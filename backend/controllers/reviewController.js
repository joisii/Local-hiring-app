import Review from "../models/Review.js";
import Job from "../models/Job.js";

export const createReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    // only completed jobs can be reviewed
    if (job.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Job not completed yet"
      });
    }

    // only job owner can review
    if (job.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    const existingReview = await Review.findOne({
      job: job._id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted"
      });
    }

    const review = await Review.create({
      job: job._id,
      client: req.user.id,
      worker: job.worker,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Review submitted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      worker: req.params.workerId
    })
      .populate("client", "name")
      .sort({ createdAt: -1 });

    // calculate average
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating =
      reviews.length > 0
        ? (totalRatings / reviews.length).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        reviews,
        averageRating
      },
      message: "Worker reviews fetched"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};