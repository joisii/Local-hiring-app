import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;